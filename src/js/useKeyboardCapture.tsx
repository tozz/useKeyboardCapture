import React, { useEffect, useState } from 'react';

// interface UseKeyboardCapture {
//   element?: React.RefObject<HTMLElement>
// }

type Element = React.RefObject<HTMLElement> | Document;

interface Stack {
  [key: string]: Array<{
    callback: (event: KeyboardEvent) => unknown;
    element: Element;
    position: number;
  }>;
}

type ModifierKeys = 'Control' | 'Meta' | 'Alt' | 'AltGraph' | 'Shift';

type Register = (
  key: KeyboardEvent['key'],
  callback: (event: KeyboardEvent) => unknown,
  modifiers?: ModifierKeys | Array<ModifierKeys>,
  element?: Element
) => number;

const stack: Stack = {};

export const useKeyboardCapture = () => {
  const listener = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    if (stack[key]) {
      console.log('key is bound', stack[key]);
    }
  };

  const register: Register = (key, callback, modifiers, element) => {
    console.log(element);
    const k = key.toUpperCase();
    if (!stack[k]) {
      stack[k] = [];
    }
    const index = stack[k].length;
    stack[k].push({
      callback,
      element: element === undefined ? document : element,
      position: index,
    });
    return index;
  };

  useEffect(() => {
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

  return {
    register,
  };
};
