import { useCallback, useEffect } from 'react';
import { keyboardEventListener } from './keyboardEventListener';

export type ModifierKeys = 'Control' | 'Meta' | 'Alt' | 'AltGraph' | 'Shift';

type UseKeyboardCapture = (
  keys: Array<KeyboardEvent['key']>,
  callback: (event: KeyboardEvent) => boolean,
  modifiers?: Array<ModifierKeys>
) => {
  unregister: () => void;
};

export const useKeyboardCapture: UseKeyboardCapture = (keys, callback, modifiers = []) => {
  const { register: eventRegister, unregister: eventUnregister } = keyboardEventListener;

  const listener = useCallback((event: KeyboardEvent) => {
    let runNextListener = true;
    let matched = false;
    keys.forEach((k) => {
      // Key value matches
      if (!matched && k.toUpperCase() === event.key.toUpperCase()) {
        // Make sure modifiers match
        const modifierCheck = modifiers.every((m) => event.getModifierState(m));
        if (modifierCheck) {
          // console.log('firing keydown match', event);
          runNextListener = callback(event);
          matched = true;
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
