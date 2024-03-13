import { useEffect, useState } from 'react';
import './App.css';
import { GameGrid } from './GameGrid/GameGrid';
import { GameModal } from './GameModal/GameModal';

function App() {

  const [difficulty, setDifficulty] = useState('easy');
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMistakes = () => {
    setMistakes(mistakes + 1);
  };

  const newGame = () => {
    setMistakes(0);
    setGameOver(false);
    setGameWon(false);
  }

  const checkGameOver = () => {
    if (mistakes === 3) {
      setGameOver(true);
      setShowModal(true);
    }
  }

  const handleGameWon = () => {
    setGameWon(true);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
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

      <GameGrid mistakesRemaining={handleMistakes} handleNewGame={newGame} difficulty={difficulty} handleGameWon={handleGameWon} />

      {showModal && gameOver ? <GameModal title={'Game Over'} description={"You have made 3 mistakes and lost the game"} closeModal={closeModal} /> : null}
      {showModal && gameWon ? <GameModal title={'Game Won'} description={"Well done! You have completed this game"} closeModal={closeModal} /> : null}
    </div>
  );
}

export default App;
