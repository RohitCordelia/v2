import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './home';

test('renders hello world', () => {
  render(<Home />);
  const element = screen.getByText(/hello world/i);
  expect(element).toBeInTheDocument();
});
