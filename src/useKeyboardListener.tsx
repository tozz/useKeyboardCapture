import { useCallback, useEffect } from 'react';
import type { KeyDownHandler } from './eventHandler';
import { eventHandler } from './eventHandler';

export type ModifierKeys = 'Control' | 'Meta' | 'ControlOrMeta' | 'Alt' | 'AltGraph' | 'Shift';

type UseKeyboardListener = (
  keys: Array<KeyboardEvent['key']>,
  callback: KeyDownHandler,
  modifiers?: Array<ModifierKeys>
) => {
  unregister: () => void;
};

export const useKeyboardListener: UseKeyboardListener = (keys, callback, modifiers = []) => {
  const { register: eventHandlerRegister, unregister: eventHandlerUnregister } = eventHandler;

  const listener = useCallback((event: KeyboardEvent) => {
    let runNextListener = true;
    let matched = false;
    keys.forEach((k) => {
      // Key value matches
      if (!matched && k === event.key) {
        // Make sure modifiers match
        const modifierCheck =
          modifiers.length > 0
            ? modifiers.every((m) =>
                m === 'ControlOrMeta'
                  ? event.getModifierState('Control') || event.getModifierState('Meta')
                  : event.getModifierState(m)
              )
            : true;
        if (modifierCheck) {
          runNextListener = callback(event);
          matched = true;
        }
      }
    });
    return runNextListener;
  }, []);

  const unregister = () => {
    eventHandlerUnregister(listener);
  };

  useEffect(() => {
    eventHandlerRegister(listener);

    return () => eventHandlerUnregister(listener);
  }, []);

  return {
    unregister,
  };
};
