import { makeAIMove } from './ai';
import { Difficulty, GameMode } from './utils';

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

export let currentPlayer: 'X' | 'O' = 'X';
let gameMode: GameMode | null = null;
export let difficultyMode: Difficulty | null = null;
let gameLocked: boolean = false;
export let cells: NodeListOf<Element> | null = null;

export const setCurrentPlayer = (player) => {
  const currentPlayerElement: HTMLSpanElement | null =
    document.getElementById('current-player');
  if (currentPlayerElement) {
    currentPlayerElement.textContent = player;
  }
  currentPlayer = player;
};

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

export const startGame = (mode: GameMode, difficulty: Difficulty): void => {
  gameMode = mode;
  difficultyMode = difficulty;
  logoH1.classList.add('logo-sm');
  gameDiv.innerHTML = '';
  gameDiv.innerHTML += `<p class="mt-2 text-xl">Current: <span id="current-player" class="font-medium text-lime-500 ">${currentPlayer}</span></p>`;
  gameDiv.appendChild(createPlaceHoldersHTML());
  document.getElementById('quit')?.addEventListener('click', () => {
    const sure = confirm('Are you sure you want to quit and lose the game?');
    if (sure) {
      //   stopGame('quit');
    }
  });
};

function handleCellClick(event: Event) {
  if (gameLocked) return;

  const cell = event.target as HTMLElement;

  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.classList.add(`cell-${currentPlayer.toLowerCase()}`);

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
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      if (gameMode === GameMode.AI && currentPlayer === 'O') {
        gameLocked = true;
        setTimeout(() => {
          makeAIMove();
          gameLocked = false;
        }, 500);
      }
    }
  }
}

export function checkWin(player: 'X' | 'O'): boolean {
  return winningCombinations.some((combination) => {
    return combination.every((index) => cells[index].textContent === player);
  });
}

export function isBoardFull(): boolean {
  return [...cells].every((cell) => cell.textContent !== '');
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('cell-o', 'cell-x');
  });
  setCurrentPlayer('X');
}

export function checkMoveWin(moveIndex: number, player: 'X' | 'O'): boolean {
  const oldCellText = cells[moveIndex].textContent;
  cells[moveIndex].textContent = player;
  const moveWin = checkWin(player);
  cells[moveIndex].textContent = oldCellText;
  return moveWin;
}

export function getOpponentPlayer(): 'X' | 'O' {
  return currentPlayer === 'X' ? 'O' : 'X';
}
