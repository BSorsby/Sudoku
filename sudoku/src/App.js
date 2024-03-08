import './App.css';
import { GameGrid } from './GameGrid/GameGrid';
import { KeyBoard } from './KeyBoard/KeyBoard';

function App() {
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <GameGrid />
    </div>
  );
}

export default App;
