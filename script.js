function GameController() {
  let turn = "X";
  let winner = "";
  const players = [
    {
      name: "",
      sign: "X",
      player: true,
    },
    {
      name: "",
      sign: "O",
      player: true,
    },
  ];

  const initPlayer1 = (name) => {
    players[0].name = name;
  };

  const initPlayer2 = (name) => {
    players[1].name = name;
  };

  const changeTurn = () => {
    if (turn == "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  };

  const runGameLoop = (screenController) => {
    const nameOfFirstUser = prompt("What is the name of the first user?");
    const nameOfSecondUser = prompt("What is the name of the second user");

    initPlayer1(nameOfFirstUser);
    initPlayer2(nameOfSecondUser);

    while (winner == "") {
      screenController.drawGameBoard();
      let x = -1;
      let y = -1;
      while (x == -1 || y == -1 || !screenController.checkPosition(x, y)) {
        x = parseInt(prompt(`What is the X ${turn}`));
        y = parseInt(prompt(`What is the Y ${turn}`));
      }

      screenController.setToGameBoard(x, y, turn);
      if (screenController.checkForWinner()) {
        winner = turn;
      }
      changeTurn();
      x = -1;
      y = -1;
    }
    console.log("And the winner is::::: " + winner);
  };

  return { runGameLoop };
}

function ScreenController() {
  let gameBoard = [[], [], []];

  const initGameBoard = () => {
    for (let i = 0; i < 3; i++) {
      gameBoard[i].push("", "", "");
    }
  };
  const drawGameBoard = () => {
    console.log(
      `${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}\n${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}\n${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}`
    );
  };

  const setToGameBoard = (x, y, turn) => {
    gameBoard[x][y] = turn;
  };

  const checkPosition = (x, y) => {
    if (x == -1 || y == -1) return false;
    if (gameBoard[x][y] == "") {
      return true;
    }
    return false;
  };

  const checkForWinner = () => {
    let board = gameBoard;
    const checkRows = () => {
      for (let i = 0; i < 3; i++) {
        if (
          board[i][0] == board[i][1] &&
          board[i][0] == board[i][2] &&
          board[i][0] != ""
        )
          return true;
      }
    };

    const checkCols = () => {
      for (let i = 0; i < 3; i++) {
        if (
          board[0][i] == board[1][i] &&
          board[0][i] == board[2][i] &&
          board[0][i] != 0
        )
          return true;
      }
    };

    const checkDiagonals = () => {
      if (
        board[0][0] == board[1][1] &&
        board[0][0] == board[2][2] &&
        board[0][0] != ""
      )
        return true;
      if (
        board[0][2] == board[1][1] &&
        board[0][2] == board[2][0] &&
        board[1][1] != ""
      )
        return true;
    };
    if (checkRows() || checkDiagonals() || checkCols()) return true;
  };

  return {
    initGameBoard,
    drawGameBoard,
    setToGameBoard,
    checkPosition,
    checkForWinner,
  };
}

const game = GameController();
const screen = ScreenController();

// screen.initGameBoard();

// game.runGameLoop(screen);
