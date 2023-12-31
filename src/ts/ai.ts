import {
  cells,
  checkMoveWin,
  checkWin,
  currentPlayer,
  difficultyMode,
  getOpponentPlayer,
  isBoardFull,
  resetBoard,
  setCurrentPlayer,
} from './game';

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export function makeAIMove() {
  const difficulty: Difficulty =
    difficultyMode !== null ? difficultyMode : Difficulty.Easy;

  if (!cells) return;
  const emptyCells = [...cells].filter(
    (cell) => cell.textContent === ''
  ) as HTMLDivElement[];
  if (emptyCells.length === 0) return;

  let selectedCell: HTMLDivElement;

  switch (difficulty) {
    case Difficulty.Easy:
      selectedCell = makeRandomMove(emptyCells);
      break;
    case Difficulty.Medium:
      selectedCell = makeMediumMove(emptyCells);
      break;
    case Difficulty.Hard:
      selectedCell = makeHardMove(emptyCells);
      break;
    default:
      selectedCell = makeRandomMove(emptyCells);
      break;
  }

  selectedCell.textContent = currentPlayer;
  selectedCell.classList.add(`cell-${currentPlayer.toLowerCase()}`);
  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      alert(currentPlayer + ' wins!');
      resetBoard();
    }, 1000);
  } else if (isBoardFull()) {
    setTimeout(() => {
      alert("It's a tie!");
      resetBoard();
    }, 1000);
  } else {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }
}

export function makeRandomMove(emptyCells: HTMLDivElement[]): HTMLDivElement {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

export function makeMediumMove(emptyCells: HTMLDivElement[]): HTMLDivElement {
  return makeRandomMove(emptyCells);
}

export function makeHardMove(emptyCells: HTMLDivElement[]): HTMLDivElement {
  for (const cell of emptyCells) {
    const index = Array.from(cells).indexOf(cell);
    if (checkMoveWin(index, currentPlayer as 'X' | 'O')) {
      return cell as HTMLDivElement;
    }
  }
  for (const cell of emptyCells) {
    const index = Array.from(cells).indexOf(cell);
    if (checkMoveWin(index, getOpponentPlayer() as 'X' | 'O')) {
      return cell as HTMLDivElement;
    }
  }
  return makeRandomMove(emptyCells);
}
