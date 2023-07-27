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

const createPlaceHoldersHTML = (): HTMLDivElement => {
  const board: HTMLDivElement | null = document.createElement('div');
  board.className = 'board grid grid-cols-3 gap-2 p-2';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
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
