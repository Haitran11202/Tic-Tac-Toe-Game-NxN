import "./styles.css";
import Board from "./components/Board";
import { useState } from "react";
export default function App() {
  const [tempBoardSize, setTempBoardSize] = useState(null);
  const [boardSize, setBoardSize] = useState(10);
  const [startGame, setStartGame] = useState(false);
  const [winnerLength, setWinnerLength] = useState(5);
  function handleSubmit(e) {
    e.preventDefault();
    setBoardSize(tempBoardSize);
    setStartGame(true);
  }
  console.log(typeof winnerLength);
  return (
    <div className="App">
      {startGame ? (
        <div className="game-board">
          <Board boardSize={boardSize} winnerLength={winnerLength} />
        </div>
      ) : (
        <p>Choose board size to start game</p>
      )}
      <br />
      {startGame ? (
        ""
      ) : (
        <div>
          <div>
            <label>Nhập số lượng ô chiến thắng</label>
            <input
              value={winnerLength}
              onChange={(event) => setWinnerLength(event.target.value)}
            />
          </div>
          <div>
            <label>Nhập kích cỡ bàn cờ </label>
            <input
              type="text"
              placeholder="EntFer a number"
              id="board-size"
              onChange={(e) => setTempBoardSize(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            className="button"
            onClick={(e) => handleSubmit(e)}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
