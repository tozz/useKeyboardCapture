import React, { useRef } from 'react';

export const KeyboardComponent = () => {
  const div = useRef<HTMLDivElement>(null);
  return <div ref={div} tabIndex={0}></div>;
};
