import React, { useRef, useState } from 'react';
import { useKeyboardListener } from './module/useKeyboardListener';
import { KeyboardListener } from './module/KeyboardListener';

export const KeyboardComponent = () => {
  const div = useRef<HTMLDivElement>(null);
  const [s, setS] = useState('x');
  const onKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    console.log('pressed Shift+Meta');
    setS(event.key);
    return true;
  };

  // useKeyboardCapture(['s', 'a'], onKeyPress, ['Meta']);
  // useKeyboardCapture(['a'], () => false, ['Meta']);

  return (
    <div ref={div} tabIndex={0}>
      {s === 'x' && <KeyboardListener keys={['Shift']} modifiers={['Shift']} onKeyDown={onKeyPress} />}
    </div>
  );
};
