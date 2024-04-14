const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boards = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function boxClicked() {
  const boxIndex = this.getAttribute("boxIndex");
  if (boards[boxIndex] != "" || !running) {
    return;
  }
  updatebox(this, boxIndex);
  checkWinner();
  playMoveSound();
}

function playMoveSound() {
  const audio = new Audio("move.wav");
  audio.play();
}

function updatebox(box, index) {
  boards[index] = currentPlayer;
  box.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const boxA = boards[condition[0]];
    const boxB = boards[condition[1]];
    const boxC = boards[condition[2]];

    if (boxA == "" || boxB == "" || boxC == "") {
      continue;
    }
    if (boxA == boxB && boxB == boxC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent =
      "CONGRATULATIONS!" + " " + `${currentPlayer}` + " " + "is a Winner";
    running = false;
    playWinSound();
  } else if (!boards.includes("")) {
    statusText.textContent = ` It's a Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function playWinSound() {
  const audio = new Audio("win.wav");
  audio.play();
}

function restartGame() {
  currentPlayer = "X";
  boards = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  boxes.forEach((box) => (box.textContent = ""));
  running = true;
}
