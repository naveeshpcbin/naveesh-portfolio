import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ScrollLinkedVideoProps {
  /** Path to the video optimized for scrubbing (all I-frames) */
  src: string;
  /** Path to a poster/fallback image (first frame) */
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
 * ScrollLinkedVideo renders a <video> element whose currentTime is driven
 * entirely by the `progress` prop (0 = first frame, 1 = last frame).
 *
 * Implementation notes:
 * - No play/pause buttons or controls are shown.
 * - The video is never put into ordinary playback mode.
 * - We use requestAnimationFrame to throttle seek operations.
 * - Metadata must be loaded before attempting to set currentTime.
 * - If reduced motion is preferred, shows a static poster image instead.
 * - Falls back to poster if video fails to load.
 */
export const ScrollLinkedVideo: React.FC<ScrollLinkedVideoProps> = ({
  src,
  poster,
  progress,
  alt = 'Portrait animation',
  className = '',
  reducedMotion = false,
  fallbackImage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const lastSeekTime = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const durationRef = useRef<number>(0);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      durationRef.current = videoRef.current.duration;
      setIsVideoReady(true);
      // Set initial frame
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Handle video error
  const handleError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Seek video to the correct frame based on scroll progress
  useEffect(() => {
    if (!isVideoReady || !videoRef.current || reducedMotion) return;

    const targetTime = progress * durationRef.current;

    // Avoid redundant seeks (threshold: ~half a frame at 24fps)
    if (Math.abs(targetTime - lastSeekTime.current) < 0.02) return;

    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = targetTime;
        lastSeekTime.current = targetTime;
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [progress, isVideoReady, reducedMotion]);

  // If reduced motion is preferred, show static image
  if (reducedMotion || videoError) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={fallbackImage || poster}
          alt={alt}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Poster image shown while video loads */}
      {!isVideoReady && (
        <img
          src={poster}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
          loading="eager"
          fetchPriority="high"
        />
      )}

      {/* The scroll-driven video — no controls, no autoplay, muted */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          // Ensure no browser default controls or UI
          pointerEvents: 'none',
        }}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default ScrollLinkedVideo;

