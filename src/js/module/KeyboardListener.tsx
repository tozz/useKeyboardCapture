import React from 'react';
import { ModifierKeys, useKeyboardListener } from './useKeyboardListener';

interface Props {
  keys: Array<KeyboardEvent['key']>;
  onKeyDown: (event: KeyboardEvent) => boolean;
  modifiers?: Array<ModifierKeys>;
}

export const KeyboardListener = ({ keys, onKeyDown, modifiers }: Props) => {
  useKeyboardListener(keys, onKeyDown, modifiers);

  return <></>;
};
