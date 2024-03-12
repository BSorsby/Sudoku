import { useEffect, useState } from 'react';
import './App.css';
import { GameGrid } from './GameGrid/GameGrid';

function App() {

  const [difficulty, setDifficulty] = useState('easy');
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMistakes = () => {
    setMistakes(mistakes + 1);
  };

  const newGame = () => {
    setMistakes(0);
    setGameOver(false);
  }

  const checkGameOver = () => {
    if (mistakes === 3) {
      setGameOver(true);
    }
  }

  useEffect(() => {
    checkGameOver();
  }, [mistakes]);

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div className='gameSettings'>
        <div className='difficulty'>{difficulty}</div>
        <div className='mistakes'>Mistakes - {mistakes}/3</div>
        <div>{gameOver ? 'game over' : 'in play'}</div>
      </div>
      <GameGrid mistakesRemaining={handleMistakes} handleNewGame={newGame} difficulty={difficulty} />

    </div>
  );
}

export default App;
