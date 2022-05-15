import { createEvent, fireEvent } from '@testing-library/dom';
import { eventHandler } from './eventHandler';

describe('eventHandler', () => {
  test('register and unregister handlers', () => {
    const listener = jest.fn();
    eventHandler.register(listener);
    const event = createEvent.keyDown(document, { key: 'a' });
    fireEvent(document, event);
    expect(listener).toHaveBeenCalledWith(event);
    eventHandler.unregister(listener);
    fireEvent(document, event);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('cancel event list continuation', () => {
    const listenerOne = jest.fn();
    const listenerTwo = jest.fn(() => false);
    eventHandler.register(listenerOne);
    eventHandler.register(listenerTwo);
    const event = createEvent.keyDown(document, { key: 'a' });
    fireEvent(document, event);
    expect(listenerOne).toHaveBeenCalledTimes(0);
    expect(listenerTwo).toHaveBeenCalledTimes(1);
  });
});

export {};
