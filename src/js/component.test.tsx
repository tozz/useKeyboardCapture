import React from 'react';
import { render, screen } from '@testing-library/react';
import { Component } from './component';

describe('Component local test', () => {
  it('renders default', () => {
    render(<Component />);
    expect(screen.getByText('Frontend Template Test View')).toBeInTheDocument();
  });
});
