import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Custom hook that tracks scroll progress through a target element.
 * Returns a normalized value between 0 and 1 representing how far
 * the user has scrolled through the element's "animation zone"
 * (from the top entering the viewport to the bottom leaving it minus one viewport).
 *
 * Uses requestAnimationFrame for efficient updates without excessive renders.
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollableDistance =
      containerRef.current.offsetHeight - window.innerHeight;

    if (totalScrollableDistance <= 0) return;

    // -rect.top = how far past the element's top edge we've scrolled
    const raw = -rect.top / totalScrollableDistance;
    const clamped = Math.min(Math.max(raw, 0), 1);

    // Only update state if the value actually changed (threshold: 0.001)
    if (Math.abs(clamped - progressRef.current) > 0.001) {
      progressRef.current = clamped;
      setProgress(clamped);
    }

    ticking.current = false;
  }, [containerRef]);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [updateProgress]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onScroll, updateProgress]);

  return progress;
}

