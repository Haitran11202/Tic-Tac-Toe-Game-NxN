import "./styles.css";
import Board from "./components/Board";
import { useState } from "react";
export default function App() {
  const [tempBoardSize, setTempBoardSize] = useState(null);
  const [boardSize, setBoardSize] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setBoardSize(tempBoardSize);
    setStartGame(true);
  }
  return (
    <div className="App">
      {startGame ? (
        <div className="game-board">
          <Board boardSize={boardSize} />
        </div>
      ) : (
        <p>Choose board size to start game</p>
      )}
      <div>
        <div>
          <label>Player 1: </label>
          <input
            type="text"
            id="p1"
            name="p1"
            placeholder="Enter Name"
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>
        <div>
          <label>Player 2: </label>
          <input
            type="text"
            id="p2"
            name="p2"
            placeholder="Enter Name"
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div>
        <label>Enter board size: </label>
        <input
          type="text"
          placeholder="Enter a number"
          id="board-size"
          onChange={(e) => setTempBoardSize(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>
        Start Game
      </button>
    </div>
  );
}
