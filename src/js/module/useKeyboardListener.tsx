import { useCallback, useEffect } from 'react';
import { eventHandler } from './eventHandler';

export type ModifierKeys = 'Control' | 'Meta' | 'Alt' | 'AltGraph' | 'Shift';

type UseKeyboardListener = (
  keys: Array<KeyboardEvent['key']>,
  callback: (event: KeyboardEvent) => boolean,
  modifiers?: Array<ModifierKeys>
) => {
  unregister: () => void;
};

export const useKeyboardListener: UseKeyboardListener = (keys, callback, modifiers = []) => {
  const { register: eventRegister, unregister: eventUnregister } = eventHandler;

  const listener = useCallback((event: KeyboardEvent) => {
    let runNextListener = true;
    let matched = false;
    keys.forEach((k) => {
      // Key value matches
      if (!matched && k === event.key) {
        // Make sure modifiers match
        const modifierCheck = modifiers.every((m) => event.getModifierState(m));
        if (modifierCheck) {
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
