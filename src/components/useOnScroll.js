import { useEffect } from 'react';

export default function useOnScroll(handler, target = window) {
  useEffect(() => {
    const listener = event => handler(event);

    target.addEventListener('scroll', listener);

    return () => {
      target.removeEventListener('scroll', listener);
    };
  }, []);
}
