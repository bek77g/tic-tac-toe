import {
  cells,
  checkMoveWin,
  checkWin,
  currentPlayer,
  difficultyMode,
  getOpponentPlayer,
  isBoardFull,
  setCurrentPlayer,
} from './game';

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export function makeAIMove() {
  const difficulty: Difficulty = difficultyMode ?? Difficulty.Easy;

  const emptyCells = [...cells].filter((cell) => cell.textContent === '');
  let selectedCell: HTMLElement;

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

export function makeRandomMove(emptyCells: HTMLElement[]): HTMLElement {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex] as HTMLElement;
}

export function makeMediumMove(emptyCells: HTMLElement[]): HTMLElement {
  return makeRandomMove(emptyCells);
}

export function makeHardMove(emptyCells: HTMLElement[]): HTMLElement {
  for (const cell of emptyCells) {
    const index = Array.from(cells).indexOf(cell);
    if (checkMoveWin(index, currentPlayer)) {
      return cell as HTMLElement;
    }
  }
  for (const cell of emptyCells) {
    const index = Array.from(cells).indexOf(cell);
    if (checkMoveWin(index, getOpponentPlayer())) {
      return cell as HTMLElement;
    }
  }
  return makeRandomMove(emptyCells);
}
