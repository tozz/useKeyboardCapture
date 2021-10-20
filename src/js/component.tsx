import React, { useRef } from 'react';
import { useKeyboardCapture } from './useKeyboardCapture';

export const Component = () => {
  const div = useRef<HTMLDivElement>(null);
  const { register } = useKeyboardCapture();
  // const { register2 } = useKeyboardCapture();

  register('s', (event) => console.log(event.key), [], div);

  return (
    <div>
      <div ref={div}>Frontend Template Test View</div>
    </div>
  );
};
