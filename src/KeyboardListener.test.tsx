import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { KeyboardListener } from './KeyboardListener';

describe('KeyboardListener', () => {
  test('binds the correct keys', () => {
    const callback = jest.fn();
    render(<KeyboardListener keys={['a', 'b', 'c']} onKeyDown={callback}></KeyboardListener>);
    fireEvent(document, new KeyboardEvent('keydown', { key: 'a' }));
    fireEvent(document, new KeyboardEvent('keydown', { key: 'b' }));
    fireEvent(document, new KeyboardEvent('keydown', { key: 'c' }));
    fireEvent(document, new KeyboardEvent('keydown', { key: 'd' }));
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
