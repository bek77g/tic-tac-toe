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
export let cells: NodeListOf<HTMLDivElement> | null = null;
let displayPlayer: HTMLParagraphElement | null = null;

const renderCurrentPlayer = (player: 'X' | 'O') => {
  if (displayPlayer) {
    let currentPlayerClass: string = 'font-medium';
    const currentPlayerColor: string =
      player.toLowerCase() === 'x' ? 'text-blue-500' : 'text-red-500';
    currentPlayerClass += ' ' + currentPlayerColor;
    displayPlayer.innerHTML = `Current: <span class="${currentPlayerClass}">${player}</span>`;
  }
};

export const setCurrentPlayer = (player: 'X' | 'O') => {
  currentPlayer = player;
  renderCurrentPlayer(player);
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
  gameDiv.innerHTML += `<p id="display-player" class="mt-2 text-xl"></p>`;
  renderCurrentPlayer(currentPlayer);
  gameDiv.appendChild(createPlaceHoldersHTML());
  document.getElementById('quit')?.addEventListener('click', () => {
    const sure = confirm('Are you sure you want to quit and lose the game?');
    if (sure) {
      //   stopGame('quit');
    }
  });
};

function handleCellClick(event: Event) {
  if (gameLocked || cells === null) return;

  const cell = event.target as HTMLDivElement;

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
    if (!cells) return;
    return combination.every((index) => cells[index].textContent === player);
  });
}

export function isBoardFull(): boolean {
  if (!cells) return false;
  return [...cells].every((cell) => cell.textContent !== '');
}

export function resetBoard() {
  if (!cells) return null;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('cell-o', 'cell-x');
  });
  setCurrentPlayer('X');
}

export function checkMoveWin(moveIndex: number, player: 'X' | 'O'): boolean {
  if (cells === null) return false;

  const oldCellText = cells[moveIndex].innerText;
  cells[moveIndex].innerText = player;
  const moveWin = checkWin(player);
  cells[moveIndex].innerText = oldCellText;
  return moveWin;
}

export function getOpponentPlayer(): 'X' | 'O' {
  return currentPlayer === 'X' ? 'O' : 'X';
}
