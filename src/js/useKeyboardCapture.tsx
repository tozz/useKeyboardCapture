import { useCallback, useEffect } from 'react';
import type { RefObject } from 'react';
import { keyboardEventListener } from './keyboardEventListener';

type ModifierKeys = 'Control' | 'Meta' | 'Alt' | 'AltGraph' | 'Shift';

type UseKeyboardCapture = (
  keys: Array<KeyboardEvent['key']>,
  callback: (event: KeyboardEvent) => boolean,
  modifiers?: Array<ModifierKeys>,
  element?: RefObject<HTMLElement>
) => {
  unregister: () => void;
};

export const useKeyboardCapture: UseKeyboardCapture = (keys, callback, modifiers = [], element) => {
  const { register: eventRegister, unregister: eventUnregister } = keyboardEventListener;

  const listener = useCallback((event: KeyboardEvent) => {
    let runNextListener = true;
    let matched = false;
    keys.forEach((k) => {
      // Key value matches
      if (!matched && k.toUpperCase() === event.key.toUpperCase()) {
        // Event is triggered within specified element (if given)
        if (element === undefined || element.current?.contains(event.target as Node)) {
          // Make sure modifiers match
          const modifierCheck = modifiers.every((m) => event.getModifierState(m));
          if (modifierCheck) {
            // console.log('firing keydown match', event);
            runNextListener = callback(event);
            matched = true;
          }
        }
      }
    });
    return runNextListener;
  }, []);

  const unregister = () => {
    eventUnregister(listener);
  };

  useEffect(() => {
    eventRegister(listener);

    return () => eventUnregister(listener);
  }, []);

  return {
    unregister,
  };
};
