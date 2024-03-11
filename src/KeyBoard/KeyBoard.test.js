import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KeyBoard from './KeyBoard';


test('renders numbers 1-9', () => {
    render(<KeyBoard />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
});

test("Number Click event called - 1", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/1/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 2", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/2/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 3", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/3/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 4", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/4/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 5", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/5/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 6", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/6/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 7", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/7/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 8", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/8/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test("Number Click event called - 9", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNumberClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/9/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test('renders Undo Button', () => {
    render(<KeyBoard />);
    const undo = screen.getByText(/Undo/i);
    expect(undo).toBeInTheDocument();
});

test("Undo Click event called", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleUndoClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/Undo/i));
    expect(mockHandleClick).toHaveBeenCalled();
});

test('renders Erase Button', () => {
    render(<KeyBoard />);
    const erase = screen.getByText(/Erase/i);
    expect(erase).toBeInTheDocument();
});

test("Erase Click event called", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleEraseClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/Erase/i));
    expect(mockHandleClick).toHaveBeenCalled();
})

test('renders Hint Button', () => {
    render(<KeyBoard />);
    const hint = screen.getByText(/Hint/i);
    expect(hint).toBeInTheDocument();
});

test("Hint Click event called", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleHintClick={mockHandleClick}
        hints={3}
    />)
    await userEvent.click(screen.getByText(/Hint/i));
    expect(mockHandleClick).toHaveBeenCalled();
})

test("Hint Click event not called with 0 hints", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleHintClick={mockHandleClick}
        hints={0}
    />)
    await userEvent.click(screen.getByText(/Hint/i));
    expect(mockHandleClick).toHaveBeenCalledTimes(0)
})

test("Hint Button disabled on 0 hints", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleHintClick={mockHandleClick}
        hints={1}
    />)
    await userEvent.click(screen.getByText(/Hint/i));
    expect(screen.getByTestId('hint-id')).toHaveClass('noHints');

})

test('renders New Game Button', () => {
    render(<KeyBoard />);
    const newGame = screen.getByText(/New Game/i);
    expect(newGame).toBeInTheDocument();
});

test("New Game Click event called", async () => {
    const mockHandleClick = jest.fn();
    render(<KeyBoard
        handleNewGameClick={mockHandleClick}
    />)
    await userEvent.click(screen.getByText(/New Game/i));
    expect(mockHandleClick).toHaveBeenCalled();
})