type KeyboardEventListener = (event: KeyboardEvent) => boolean;

const keyboardEventListenerFunc = () => {
  let registeredListeners: Array<KeyboardEventListener> = [];

  const onKeyDown = (event: KeyboardEvent) => {
    if (registeredListeners.length > 0) {
      let continueProcessing = true;
      registeredListeners.forEach((listener) => {
        if (continueProcessing) {
          continueProcessing = listener(event);
        }
      });
    }
  };

  const register = (listener: KeyboardEventListener) => {
    // console.log('registering', listener);
    registeredListeners.unshift(listener);
  };

  const unregister = (listener: KeyboardEventListener) => {
    // console.log('unregistering', listener);
    registeredListeners = registeredListeners.filter((registered) => registered !== listener);
  };

  document.addEventListener('keydown', onKeyDown);

  return {
    register,
    unregister,
  };
};

export const keyboardEventListener = keyboardEventListenerFunc();
