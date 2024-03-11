import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const header = screen.getByText(/Sudoku/i);
  expect(header).toBeInTheDocument();
});
