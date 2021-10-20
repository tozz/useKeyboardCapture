import React, { useState } from 'react';
import { KeyboardComponent } from './KeyboardComponent';

export const Component = () => {
  const [show, setShow] = useState(true);

  // setTimeout(() => setShow(false), 3000);

  return <div>{show && <KeyboardComponent />}</div>;
};
