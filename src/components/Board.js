import { useState } from "react";
import Block from "./Block";
export default function Board(props) {
  const boardSize = props.boardSize;
  let count = 0;
  const numberBoardSize = parseInt(boardSize);
  const [checks, setChecks] = useState([[]]);
  const [historys, setHistorys] = useState([[]]);
  const [winners, setWinners] = useState([[]]);
  const [gameState, setGameState] = useState();
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [blocks, setBlocks] = useState(
    Array(numberBoardSize)
      .fill("")
      .map(() => new Array(numberBoardSize).fill(""))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
    gridGap: "2px",
    margin: "50px",
    maxWidth: "250px",
  };

  const calculatorWinner = () => {
    const size = boardSize;
    let arr = [[]];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      if (blocks[rowIndex].every((cell) => cell === currentPlayer)) {
        blocks[rowIndex].map((cell, index) => {
          arr.push([rowIndex, index]);
          return setWinners(arr);
        });
        return currentPlayer;
      }
    }

    // Check columns
    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      if (blocks.every((row) => row[columnIndex] === currentPlayer)) {
        blocks[columnIndex].map((cell, index) => {
          arr.push([index, columnIndex]);
          return setWinners(arr);
        });
        return currentPlayer;
      }
    }

    // Check diagonal from top left to bottom right
    if (blocks.every((row, index) => row[index] === currentPlayer)) {
      blocks.map((block, index) => {
        arr.push([index, index]);
        setWinners(arr);
      });
      return currentPlayer;
    }

    // Check diagonal from top right to bottom left
    if (blocks.every((row, index) => row[size - 1 - index] === currentPlayer)) {
      blocks.map((block, index) => {
        arr.push([index, size - 1 - index]);
        setWinners(arr);
      });
      return currentPlayer;
    }

    return null;
  };
  const handleClick = (i, j) => {
    const newBlocks = [...blocks];
    newBlocks[i][j] = xIsNext ? "X" : "O";
    const winner = calculatorWinner();
    if (winner) {
      setGameState(winner);
    } else if (count === boardSize * boardSize) {
      console.log("Tie");
      return;
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setHistorys([...historys, [i, j]]);
    setBlocks(newBlocks);
    setXIsNext(!xIsNext);
    setChecks([i, j]);
    count++;
  };
  console.log(gameState);
  const renderBlocks = (n) => {
    const genderBlocks = [];
    let key = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        key++;
        genderBlocks.push(
          <Block
            disabled={gameState ? true : false}
            handleClick={() => handleClick(i, j)}
            value={blocks[i][j]}
            key={key}
            clicked={checks[0] === i && checks[1] === j ? "highlight" : ""}
            winnerBlock={
              winners.some((winner) => winner[0] === i && winner[1] === j)
                ? "winner"
                : ""
            }
          />
        );
      }
    }
    return genderBlocks;
  };
  console.log(winners);
  return (
    <div className="game-wrapper">
      <div className="board" style={style}>
        {renderBlocks(boardSize)}
      </div>
      <div className="infor-game">
        <div>{currentPlayer}</div>
        <div>
          <div>history</div>
          <div>
            {historys.map((history, index) => (
              <div key={index}>
                <span>
                  {history[0]} {history[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
