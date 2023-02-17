import { useState } from "react";
import Block from "./Block";
export default function Board(props) {
  const { boardSize, winnerLength } = props;
  const [count, setCount] = useState(0);
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
    maxWidth: "716px",
  };

  const calculatorWinner = (row, col) => {
    // Kiểm tra hàng
    let count = 1;
    let i = col - 1;
    while (i >= 0 && blocks[row][i] === blocks[row][col]) {
      count++;
      i--;
    }
    i = col + 1;
    while (i < boardSize && blocks[row][i] === blocks[row][col]) {
      count++;
      i++;
    }
    if (count >= winnerLength) {
      console.log("Chiến thắng");
      return blocks[row][col];
    }
    //Kiểm tra cột
    count = 1;
    let j = row - 1;
    while (j >= 0 && blocks[j][col] === blocks[row][col]) {
      count++;
      j--;
    }
    j = row + 1;
    while (j < boardSize && blocks[j][col] === blocks[row][col]) {
      count++;
      j++;
    }
    if (count >= winnerLength) {
      console.log("Chiến thắng");
      return blocks[row][col];
    }
    // Kiểm tra đường chéo chính
    count = 1;
    i = col - 1;
    j = row - 1;
    while (i >= 0 && j >= 0 && blocks[j][i] === blocks[row][col]) {
      count++;
      i--;
      j--;
    }
    i = col + 1;
    j = row + 1;
    while (
      i < boardSize &&
      j < boardSize &&
      blocks[j][i] === blocks[row][col]
    ) {
      count++;
      i++;
      j++;
    }
    if (count >= winnerLength) {
      console.log("Chiến thắng");
      return blocks[row][col];
    }
    // Kiểm tra đường chéo phụ
    count = 1;
    i = col + 1;
    j = row - 1;
    while (i < boardSize && j >= 0 && blocks[j][i] === blocks[row][col]) {
      count++;
      i++;
      j--;
    }
    i = col - 1;
    j = row + 1;
    while (i >= 0 && j < boardSize && blocks[j][i] === blocks[row][col]) {
      count++;
      i--;
      j++;
    }
    if (count >= winnerLength) {
      console.log("Chiến thắng");
      return blocks[row][col];
    }

    return null;
  };

  const handleClick = (i, j) => {
    const newBlocks = [...blocks];
    newBlocks[i][j] = xIsNext ? "X" : "O";
    const winner = calculatorWinner(i, j);
    if (winner) {
      setGameState(winner + " thắng");
    } else if (count === boardSize * boardSize - 1) {
      setGameState("Hòa");
      return;
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setHistorys([...historys, [i, j, count]]);
    setBlocks(newBlocks);
    setXIsNext(!xIsNext);
    setChecks([i, j]);
    setCount(count + 1);
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
            disabled={blocks[i][j] !== "" || gameState ? true : false}
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
  const handleToggle = () => {
    let arr = [...historys];
    arr.reverse();
    setHistorys(arr);
  };
  return (
    <div className="game-wrapper">
      <div className="board" style={style}>
        {renderBlocks(boardSize)}
      </div>
      <div className="infor-game">
        {gameState ? (
          <div>{gameState}</div>
        ) : (
          <div>Lượt tiếp theo: {currentPlayer}</div>
        )}
        <table>
          <thead>
            <tr>
              <th>Lượt</th>
              <th>hàng</th>
              <th>cột</th>
            </tr>
          </thead>
          <tbody>
            {historys.map((history, index) => (
              <tr key={index}>
                <td>{history[2]}</td>
                <td>{history[0]}</td>
                <td>{history[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleToggle}>Toggle</button>
      </div>
    </div>
  );
}
