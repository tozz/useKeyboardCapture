import React from 'react';
import type { PropsWithChildren } from 'react';
import type { ModifierKeys } from './useKeyboardListener';
import type { KeyDownHandler } from './eventHandler';
import { useKeyboardListener } from './useKeyboardListener';

interface Props {
  keys: Array<KeyboardEvent['key']>;
  onKeyDown: KeyDownHandler;
  modifiers?: Array<ModifierKeys>;
}

export const KeyboardListener = ({ children, keys, onKeyDown, modifiers }: PropsWithChildren<Props>) => {
  useKeyboardListener(keys, onKeyDown, modifiers);

  return <>{children}</>;
};
