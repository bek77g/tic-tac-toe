import { Difficulty, GameMode } from './main';

const gameDiv: HTMLDivElement = document.getElementById(
  'game'
) as HTMLDivElement;
const logoH1: HTMLHeadingElement = document.getElementById(
  'logo'
) as HTMLHeadingElement;

const winningCombinations: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer: 'X' | 'O' = 'X';
let gameMode: GameMode | null = null;
let gameLocked: boolean = false;
let cells: NodeListOf<Element> | null = null;

const createPlaceHoldersHTML = (): HTMLDivElement => {
  const board: HTMLDivElement | null = document.createElement('div');
  board.className = 'board grid grid-cols-3 gap-2 p-2';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
  cells = board.querySelectorAll('.cell');
  return board;
};

export const startGame = (mode: GameMode): void => {
  gameMode = mode;
  logoH1.classList.add('logo-sm');
  gameDiv.innerHTML = '';
  gameDiv.appendChild(createPlaceHoldersHTML());
  document.getElementById('quit')?.addEventListener('click', () => {
    const sure = confirm('Are you sure you want to quit and lose the game?');
    if (sure) {
      //   stopGame('quit');
    }
  });
};

function handleCellClick(event: Event) {
  if (gameLocked) return; // Если игра заблокирована, не обрабатываем клик

  const cell = event.target as HTMLElement;

  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        alert(currentPlayer + ' wins');
        resetBoard();
      }, 1000);
    } else if (isBoardFull()) {
      setTimeout(() => {
        alert("It's a tie!");
        resetBoard();
      }, 1000);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameMode === GameMode.AI && currentPlayer === 'O') {
        // Пауза перед ходом компьютера
        gameLocked = true;
        setTimeout(() => {
          makeAIMove();
          gameLocked = false;
        }, 500);
      }
    }
  }
}

function checkWin(player: 'X' | 'O'): boolean {
  return winningCombinations.some((combination) => {
    return combination.every((index) => cells[index].textContent === player);
  });
}

function isBoardFull(): boolean {
  return [...cells].every((cell) => cell.textContent !== '');
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('o', 'x');
  });
  currentPlayer = 'X';
}

function makeAIMove() {
  const difficulty: Difficulty = Difficulty.Hard;

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

  setTimeout(() => {
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
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }, 1000);
}

function makeRandomMove(emptyCells: HTMLElement[]): HTMLElement {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex] as HTMLElement;
}

function makeMediumMove(emptyCells: HTMLElement[]): HTMLElement {
  return makeRandomMove(emptyCells);
}

function makeHardMove(emptyCells: HTMLElement[]): HTMLElement {
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

function checkMoveWin(moveIndex: number, player: 'X' | 'O'): boolean {
  const oldCellText = cells[moveIndex].textContent;
  cells[moveIndex].textContent = player;
  const moveWin = checkWin(player);
  cells[moveIndex].textContent = oldCellText;
  return moveWin;
}

function getOpponentPlayer(): 'X' | 'O' {
  return currentPlayer === 'X' ? 'O' : 'X';
}
