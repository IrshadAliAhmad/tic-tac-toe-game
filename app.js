const boxes = document.querySelectorAll(".box");
const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");
const newGameBtn = document.getElementById("newGameBtn");
const resetBtn = document.getElementById("resetBtn");
const themeBtn = document.getElementById("themeBtn");
const modeSelect = document.getElementById("mode");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

const xScore = document.getElementById("xWins");
const oScore = document.getElementById("oWins");
const drawScore = document.getElementById("draws");

let turn = "X";
let board = Array(9).fill("");
let playing = true;
let mode = "pvp";
let scores = { X: 0, O: 0, D: 0 };

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box, i) => {
  box.addEventListener("click", () => playerMove(i));
});

function playerMove(i) {
  if (!playing || board[i] !== "") return;
  clickSound.play();
  board[i] = turn;
  boxes[i].textContent = turn;
  checkResult();

  if (playing) {
    if (mode === "pvp") {
      turn = turn === "X" ? "O" : "X";
    } else if (turn === "X") {
      turn = "O";
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  let bestMove = getBestMove();
  board[bestMove] = "O";
  boxes[bestMove].textContent = "O";
  clickSound.play();
  checkResult();
  turn = "X";
}

function getBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  let winner = checkWinnerSimple();
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every((cell) => cell !== "")) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = "";
      }
    }
    return best;
  }
}

function checkWinnerSimple() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c])
      return board[a];
  }
  return null;
}

function checkResult() {
  let winner = checkWinnerSimple();
  if (winner) {
    winSound.play();
    resultText.textContent =
      winner === "X"
        ? "🎉 Player X Wins!"
        : mode === "ai"
        ? "💻 Computer Wins!"
        : "🎉 Player O Wins!";
    scores[winner]++;
    showPopup();
  } else if (board.every((cell) => cell !== "")) {
    drawSound.play();
    resultText.textContent = "🤝 It's a Draw!";
    scores.D++;
    showPopup();
  }
  updateScore();
}

function updateScore() {
  xScore.textContent = scores.X;
  oScore.textContent = scores.O;
  drawScore.textContent = scores.D;
}

function showPopup() {
  playing = false;
  popup.classList.remove("hidden");
}

function resetBoard() {
  board = Array(9).fill("");
  boxes.forEach((b) => (b.textContent = ""));
  playing = true;
  turn = "X";
  popup.classList.add("hidden");
}

newGameBtn.addEventListener("click", resetBoard);
resetBtn.addEventListener("click", resetBoard);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "🌙 Dark Mode"
    : "🌞 Light Mode";
});

modeSelect.addEventListener("change", (e) => {
  mode = e.target.value;
  resetBoard();
});
