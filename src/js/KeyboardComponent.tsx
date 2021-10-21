import React, { useRef, useState } from 'react';
import { useKeyboardCapture } from './useKeyboardCapture';
import { KeyboardListener } from './KeyboardListener';

export const KeyboardComponent = () => {
  const div = useRef<HTMLDivElement>(null);
  const [s, setS] = useState('x');
  const onKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    console.log('pressed x');
    setS(event.key);
    return true;
  };

  // useKeyboardCapture(['s', 'a'], onKeyPress, ['Meta']);
  // useKeyboardCapture(['a'], () => false, ['Meta']);

  return (
    <div ref={div} tabIndex={0}>
      {s === 'x' && <KeyboardListener keys={['a']} onKeyDown={onKeyPress} />}
    </div>
  );
};
