type EventHandler = (event: KeyboardEvent) => boolean;
type KeyboardEventName = 'keydown';

const keyboardEventListenerFunc = () => {
  const registeredListeners: {
    keydown: Array<EventHandler>;
  } = { keydown: [] };

  const onKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);
    if (registeredListeners.keydown.length > 0) {
      let continueProcessing = true;
      registeredListeners.keydown.forEach((listener) => {
        if (continueProcessing) {
          continueProcessing = listener(event);
        }
      });
    }
  };

  const register = (listener: EventHandler, event: KeyboardEventName = 'keydown') => {
    // console.log('registering', listener);
    registeredListeners[event].unshift(listener);
  };

  const unregister = (listener: EventHandler, event: KeyboardEventName = 'keydown') => {
    // console.log('unregistering', listener);
    registeredListeners[event] = registeredListeners[event].filter((registered) => registered !== listener);
  };

  document.addEventListener('keydown', onKeyDown);

  return {
    register,
    unregister,
  };
};

export const eventHandler = keyboardEventListenerFunc();
