import { renderHook } from '@testing-library/react-hooks';
import { createEvent, fireEvent } from '@testing-library/dom';
import { useKeyboardListener } from './useKeyboardListener';
import { eventHandler } from './eventHandler';

describe('useKeyboardListener', () => {
  test('single key', () => {
    const callback = jest.fn();
    const eventA = createEvent.keyDown(document, { key: 'a' });
    const eventB = createEvent.keyDown(document, { key: 'b' });
    renderHook(() => useKeyboardListener(['a'], callback));
    fireEvent(document, eventB);
    expect(callback).not.toHaveBeenCalled();
    fireEvent(document, eventA);
    expect(callback).toHaveBeenCalledWith(eventA);
  });

  test('multiple keys', () => {
    const callback = jest.fn();
    const eventA = createEvent.keyDown(document, { key: 'x' });
    const eventB = createEvent.keyDown(document, { key: 'y' });
    renderHook(() => useKeyboardListener(['x', 'y'], callback));
    fireEvent(document, eventA);
    fireEvent(document, eventB);
    expect(callback).toHaveBeenCalledWith(eventA);
    expect(callback).toHaveBeenCalledWith(eventB);
  });

  test('Meta and Control', () => {
    const metaCallback = jest.fn();
    const controlCallback = jest.fn();
    const eventMeta = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
    const eventControl = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true });
    jest.spyOn(eventMeta, 'getModifierState').mockImplementation((modifier) => modifier === 'Meta');
    jest.spyOn(eventControl, 'getModifierState').mockImplementation((modifier) => modifier === 'Control');
    renderHook(() => useKeyboardListener(['a'], metaCallback, ['Meta']));
    renderHook(() => useKeyboardListener(['a'], controlCallback, ['Control']));
    fireEvent(document, eventMeta);
    fireEvent(document, eventControl);
    expect(metaCallback).toHaveBeenCalled();
    expect(controlCallback).toHaveBeenCalled();
  });

  test('Combined Meta and Shift', () => {
    const callback = jest.fn();
    const event = new KeyboardEvent('keydown', { key: 'a', metaKey: true, shiftKey: true });
    const eventFail = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
    jest.spyOn(event, 'getModifierState').mockImplementation((modifier) => modifier === 'Meta' || modifier === 'Shift');
    renderHook(() => useKeyboardListener(['a'], callback, ['Meta', 'Shift']));
    fireEvent(document, event);
    fireEvent(document, eventFail);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('ControlOrMeta', () => {
    const callback = jest.fn();
    const eventMeta = new KeyboardEvent('keydown', { key: 'a', metaKey: true });
    const eventCtrl = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true });
    jest.spyOn(eventMeta, 'getModifierState').mockImplementation((modifier) => modifier === 'Meta');
    jest.spyOn(eventCtrl, 'getModifierState').mockImplementation((modifier) => modifier === 'Control');
    renderHook(() => useKeyboardListener(['a'], callback, ['ControlOrMeta']));
    fireEvent(document, eventMeta);
    fireEvent(document, eventCtrl);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('unregistering listener', () => {
    const callback = jest.fn();
    const event = createEvent.keyDown(document, { key: 'a' });
    const spy = jest.spyOn(eventHandler, 'unregister');
    const { unmount } = renderHook(() => useKeyboardListener(['a'], callback));
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledWith(event);
    unmount();
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
  });
});
