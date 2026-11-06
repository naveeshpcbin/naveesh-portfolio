import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ScrollLinkedVideoProps {
  /** Path to transparent WebM video (VP9 with alpha_mode 1) */
  srcWebm?: string;
  /** Path to all-I-frame H.264 MP4 video for universal hardware scrubbing */
  srcMp4?: string;
  /** Path to transparent poster image (first frame) */
  poster: string;
  /** Normalized scroll progress 0..1 */
  progress: number;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether the user prefers reduced motion */
  reducedMotion?: boolean;
  /** Fallback image if video fails */
  fallbackImage?: string;
}

/**
 * ScrollLinkedVideo renders a strict 9:16 portrait video whose playback time
 * is driven strictly by page scroll progress (0 = front-facing, 1 = side profile).
 */
export const ScrollLinkedVideo: React.FC<ScrollLinkedVideoProps> = ({
  srcWebm = '/videos/naveesh-portrait-alpha.webm',
  srcMp4 = '/videos/naveesh-portrait-720p.mp4',
  poster = '/images/naveesh-portrait-poster.webp',
  progress,
  alt = 'Naveesh — architectural portrait turning from front-facing to three-quarter profile',
  className = '',
  reducedMotion = false,
  fallbackImage = '/images/naveesh-portrait-poster.webp',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const glTextureRef = useRef<WebGLTexture | null>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [useWebGL, setUseWebGL] = useState(false);

  const lastSeekTime = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const durationRef = useRef<number>(0);

  // Detect Safari / iOS or environments requiring WebGL keying
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua) || /iPad|iPhone|iPod/.test(ua);
    if (isSafari) {
      setUseWebGL(true);
    }
  }, []);

  // WebGL context and shader setup
  useEffect(() => {
    if (!useWebGL || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });

    if (!gl) {
      setUseWebGL(false);
      return;
    }

    glRef.current = gl;

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
        v_uv = (a_pos + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y;
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_uv;
      void main() {
        vec4 color = texture2D(u_image, v_uv);
        float r = color.r;
        float g = color.g;
        float b = color.b;

        // Despill green
        float target_g = 0.5 * (r + b);
        float despill_g = min(g, target_g);

        // Green excess difference key
        float green_excess = g - target_g;
        float t_low = 0.0235;
        float t_high = 0.1020;
        float a = clamp(1.0 - (green_excess - t_low) / (t_high - t_low), 0.0, 1.0);
        a = a * a * (3.0 - 2.0 * a);

        gl_FragColor = vec4(r, despill_g, b, a);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    glTextureRef.current = texture;

    return () => {
      if (gl) {
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      }
    };
  }, [useWebGL]);

  // Render WebGL frame
  const renderWebGLFrame = useCallback(() => {
    const gl = glRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!gl || !video || !canvas || video.readyState < 2) return;

    gl.bindTexture(gl.TEXTURE_2D, glTextureRef.current);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      durationRef.current = video.duration || 9.9;
      // Seek slightly forward to force frame decode
      video.currentTime = 0.001;
      setIsVideoReady(true);
      if (useWebGL) {
        renderWebGLFrame();
      }
    }
  }, [useWebGL, renderWebGLFrame]);

  // Handle video error with graceful fallback
  const handleError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Seek video when scroll progress updates
  useEffect(() => {
    if (!isVideoReady || !videoRef.current || reducedMotion) return;

    const dur = durationRef.current || 9.9;
    const targetTime = progress * dur;

    // Avoid redundant seeking (< 0.02s)
    if (Math.abs(targetTime - lastSeekTime.current) < 0.02) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0.001, Math.min(targetTime, dur - 0.01));
        lastSeekTime.current = targetTime;
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [progress, isVideoReady, reducedMotion]);

  // WebGL seeked listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useWebGL) return;

    const onSeeked = () => {
      renderWebGLFrame();
    };

    video.addEventListener('seeked', onSeeked);
    return () => {
      video.removeEventListener('seeked', onSeeked);
    };
  }, [useWebGL, renderWebGLFrame]);

  // If reduced motion is preferred or video error, show static 9:16 poster
  if (reducedMotion || videoError) {
    return (
      <div
        className={`relative ${className}`}
        style={{ aspectRatio: '9 / 16' }}
      >
        <img
          src={fallbackImage || poster}
          alt={alt}
          className="w-full h-full object-contain pointer-events-none select-none"
          style={{ aspectRatio: '9 / 16' }}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  const activeSrc = useWebGL ? srcMp4 : srcWebm;

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: '9 / 16' }}
    >
      {/* High-resolution transparent poster underlay (ensures zero flash during load) */}
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain z-0 pointer-events-none select-none transition-opacity duration-300 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ aspectRatio: '9 / 16' }}
        loading="eager"
        fetchPriority="high"
      />

      {/* Primary Video Element */}
      <video
        ref={videoRef}
        src={activeSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={() => setIsVideoReady(true)}
        onError={handleError}
        style={{
          aspectRatio: '9 / 16',
          pointerEvents: 'none',
          display: useWebGL ? 'none' : 'block',
        }}
        className={`relative z-10 w-full h-full object-contain transition-opacity duration-300 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* WebGL Canvas for Safari / iOS real-time chroma key */}
      {useWebGL && (
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          style={{
            aspectRatio: '9 / 16',
            pointerEvents: 'none',
          }}
          className={`relative z-10 w-full h-full object-contain transition-opacity duration-300 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ScrollLinkedVideo;
