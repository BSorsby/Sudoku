import { render, screen, fireEvent, FireFunction } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameGrid from './GameGrid';

test('renders keyboard section', () => {
    render(<GameGrid />);
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
});

