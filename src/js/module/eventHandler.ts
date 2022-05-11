type EventHandler = (event: KeyboardEvent) => boolean;
type KeyboardEventName = 'keydown';
export type KeyDownHandler = (event: KeyboardEvent) => boolean;

const keyboardEventListenerFunc = () => {
  const registeredListeners: {
    keydown: Array<EventHandler>;
  } = { keydown: [] };

  const onKeyDown = (event: KeyboardEvent) => {
    if (registeredListeners.keydown.length > 0) {
      let continueProcessing = true;
      registeredListeners.keydown.forEach((listener: KeyDownHandler) => {
        if (continueProcessing) {
          continueProcessing = listener(event);
        }
      });
    }
  };

  const register = (listener: EventHandler, event: KeyboardEventName = 'keydown') => {
    registeredListeners[event].unshift(listener);
  };

  const unregister = (listener: EventHandler, event: KeyboardEventName = 'keydown') => {
    registeredListeners[event] = registeredListeners[event].filter((registered) => registered !== listener);
  };

  document.addEventListener('keydown', onKeyDown);

  return {
    register,
    unregister,
  };
};

export const eventHandler = keyboardEventListenerFunc();
