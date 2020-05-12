import * as React from 'react';

export const useMousePosition = (element: React.MutableRefObject<HTMLElement>) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const setFromEvent = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    const currentElement = element.current;

    if (currentElement) {
      currentElement.addEventListener('mousemove', setFromEvent);
    }

    return () => {
      if (currentElement) {
        window.removeEventListener('mousemove', setFromEvent);
      }
    };
  }, [element]);

  return position;
};
