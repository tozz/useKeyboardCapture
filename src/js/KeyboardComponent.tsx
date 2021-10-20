import React, { useEffect, useRef, useState } from 'react';
import { useKeyboardCapture } from './useKeyboardCapture';

export const KeyboardComponent = () => {
  const div = useRef<HTMLDivElement>(null);
  const [s, setS] = useState('x');
  const onS = (event: KeyboardEvent) => {
    console.log('s pressed');
  };

  const onA = (event: KeyboardEvent) => {
    console.log('a pressed');
  };
  useKeyboardCapture('s', onS);
  useKeyboardCapture('a', onA);

  return <div ref={div}>Keyboard listener</div>;
};
