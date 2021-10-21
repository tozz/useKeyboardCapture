import React from 'react';
import { ModifierKeys, useKeyboardCapture } from './useKeyboardCapture';

interface Props {
  keys: Array<KeyboardEvent['key']>;
  onKeyDown: (event: KeyboardEvent) => boolean;
  modifiers?: Array<ModifierKeys>;
}

export const KeyboardListener = ({ keys, onKeyDown, modifiers }: Props) => {
  useKeyboardCapture(keys, onKeyDown, modifiers);

  return <></>;
};
