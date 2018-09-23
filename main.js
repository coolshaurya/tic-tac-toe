let turn = "X";
const buttons = [...document.querySelectorAll("table button")];
const diagonals = [[0, 4, 8], [2, 4, 6]];
const playGrid = document.querySelector(".playGrid");
const turnElm = document.querySelector(".turn");
const resetBtn = document.querySelector(".reset");

playGrid.addEventListener("click", e => {
  if (!e.target.matches("button")) return;
  if (e.target.innerHTML !== "") return;
  playTurn(e.target.dataset.cell);
});
resetBtn.addEventListener("click", reset);

function showTurn() {
  turnElm.innerHTML = turn;
}

function playWin(player) {
  alert(`${player} won this game`);
  reset();
}

function playTie() {
  alert("Game Tied ! \n Nobody won !");
  reset();
}

function checkWin(cell) {
  const yCells = buttons
    .filter(btn => btn.dataset.cellY === buttons[cell].dataset.cellY)
    .map(btn => btn.innerHTML);
  const xCells = buttons
    .filter(btn => btn.dataset.cellX === buttons[cell].dataset.cellX)
    .map(btn => btn.innerHTML);

  const diag1Cells = buttons
    .filter(
      btn =>
        diagonals[0].includes(parseInt(btn.dataset.cell)) &&
        btn.innerHTML !== ""
    )
    .map(btn => btn.innerHTML);

  const diag2Cells = buttons
    .filter(
      btn =>
        diagonals[1].includes(parseInt(btn.dataset.cell)) &&
        btn.innerHTML !== ""
    )
    .map(btn => btn.innerHTML);

  if (
    (xCells[0] === xCells[1] && xCells[1] === xCells[2]) ||
    (yCells[0] === yCells[1] && yCells[1] === yCells[2]) ||
    (diag1Cells[0] === diag1Cells[1] &&
      diag1Cells[1] === diag1Cells[2] &&
      diag1Cells.length === 3) ||
    (diag2Cells[0] === diag2Cells[1] &&
      diag2Cells[1] === diag2Cells[2] &&
      diag2Cells.length === 3)
  ) {
    playWin(buttons[cell].innerHTML);
    return true;
  } else if (buttons.every(btn => btn.innerHTML !== "")) {
    playTie();
  } else {
    return false;
  }
}

function reset() {
  buttons.forEach(btn => (btn.innerHTML = ""));
  turn = "X";
  showTurn();
}

function playTurn(cell) {
  buttons[cell].innerHTML = turn;
  turnElm.innerHTML = turn;

  if (checkWin(cell)) return;
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }

  showTurn();
}

showTurn();
