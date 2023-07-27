const gameDiv: HTMLDivElement = document.getElementById(
  'game'
) as HTMLDivElement;
const logoH1: HTMLHeadingElement = document.getElementById(
  'logo'
) as HTMLHeadingElement;
let cells: NodeListOf<Element> | null = null;

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

export const startGame = (): void => {
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
  const cell = event.target as HTMLElement;

  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.classList.add(`cell-${currentPlayer.toLowerCase()}`);

    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        alert(currentPlayer + ' wins');
        resetBoard();
      }, 100);
    } else if (isBoardFull()) {
      setTimeout(() => {
        alert("It's a tie!");
        resetBoard();
      }, 100);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        makeAIMove();
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
  const emptyCells = [...cells].filter((cell) => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex] as HTMLElement;

  setTimeout(() => {
    cell.textContent = currentPlayer;
    cell.classList.add(`cell-${currentPlayer.toLowerCase()}`);
    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        alert(currentPlayer + ' wins!');
        resetBoard();
      }, 100);
    } else if (isBoardFull()) {
      setTimeout(() => {
        alert("It's a tie!");
        resetBoard();
      }, 100);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }, 500);
}
