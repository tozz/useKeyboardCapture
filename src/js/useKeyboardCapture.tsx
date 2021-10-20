import React, { useEffect, useRef } from 'react';
import { keyboardEventListener } from './keyboardEventListener';

type Element = React.RefObject<HTMLElement> | Document;

type ModifierKeys = 'Control' | 'Meta' | 'Alt' | 'AltGraph' | 'Shift';

type UseKeyboardCapture = (
  key: KeyboardEvent['key'],
  callback: (event: KeyboardEvent) => unknown,
  modifiers?: Array<ModifierKeys>,
  element?: Element
) => void;

export const useKeyboardCapture: UseKeyboardCapture = (key, callback, modifiers, element) => {
  if (element === null) {
    throw new Error(
      'You tried to bind an event to a ref that has not been initiated, make sure your ref exists first!'
    );
  }

  const processed = useRef<boolean>(false);

  if (processed.current) {
    return;
  }

  const listener = (event: KeyboardEvent) => {
    if (key.toUpperCase() === event.key.toUpperCase()) {
      console.log('key is bound', key);
    }
  };

  useEffect(() => {
    const { register, unregister } = keyboardEventListener;
    register(listener);

    return () => unregister(listener);
  }, []);
};
