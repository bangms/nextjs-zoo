import { useRef, useEffect, useCallback } from 'react';

const useScrollClipPath = (direction = 'left', duration = 1, delay = 0) => {
  const element = useRef();

  const handleClipPath = (name) => {
    switch (name) {
      case 'up':
        return 'inset(100% 0 0 0)';
      case 'down':
        return 'inset(0 0 100% 0)';
      case 'left':
        return 'inset(0 100% 0 0)';
      case 'right':
        return 'inset(0 0 0 100%)';
      default:
        return;
    }
  };

  const onScroll = useCallback(
    ([entry]) => {
        console.log('element', element)
      const { current } = element;
      if (entry.isIntersecting) {
        current.style.webkitTransitionProperty = 'transform, clip-path';
        current.style.MozTransitionProperty = 'transform, clip-path';
        current.style.msTransitionProperty = 'transform, clip-path';
        current.style.OTransitionProperty = 'transform, clip-path';
        current.style.transitionProperty = 'transform, clip-path';

        current.style.webkitTransitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.MozTransitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.msTransitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.OTransitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.transitionDuration = `${duration * 1.5}s, ${duration}s`;

        current.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.MozTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.msTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.OTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';

        current.style.webkitTransitionDelay = `${delay}s`;
        current.style.MozTransitionDelay = `${delay}s`;
        current.style.msTransitionDelay = `${delay}s`;
        current.style.OTransitionDelay = `${delay}s`;
        current.style.transitionDelay = `${delay}s`;

        current.style.webkitTransform = 'scale(1)'
        current.style.MozTransform = 'scale(1)';
        current.style.msTransform = 'scale(1)';
        current.style.OTransform = 'scale(1)';
        current.style.transform = 'scale(1)';

        current.style.webkitClipPath = 'inset(0 0 0 0)';
        current.style.MozClipPath = 'inset(0 0 0 0)';
        current.style.msClipPath = 'inset(0 0 0 0)';
        current.style.OClipPath = 'inset(0 0 0 0)';
        current.style.clipPath = 'inset(0 0 0 0)';
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.observe(element.current.parentNode);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
    style: {
      webkitTransform: 'scale(1.2)',
      MozTransform: 'scale(1.2)',
      msTransform: 'scale(1.2)',
      OTransform: 'scale(1.2)',
      transform: 'scale(1.2)',
      webkitClipPath: handleClipPath(direction),
      MozClipPath: handleClipPath(direction),
      msClipPath: handleClipPath(direction),
      OClipPath: handleClipPath(direction),
      clipPath: handleClipPath(direction),
    },
  };
};

export default useScrollClipPath;
