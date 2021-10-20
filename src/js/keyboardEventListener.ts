type KeyboardEventListener = (event: KeyboardEvent) => void;

const keyboardEventListenerFunc = () => {
  let registeredListeners: Array<KeyboardEventListener> = [];

  const onKeyDown = (event: KeyboardEvent) => {
    registeredListeners.forEach((listener) => listener(event));
  };

  const register = (listener: KeyboardEventListener) => {
    // console.log('registering', listener);
    registeredListeners.push(listener);
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
