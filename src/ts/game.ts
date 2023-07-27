const gameDiv: HTMLDivElement = document.getElementById(
  'game'
) as HTMLDivElement;
const logoH1: HTMLHeadingElement = document.getElementById(
  'logo'
) as HTMLHeadingElement;

const createPlaceHoldersHTML = (): string => {
  return `
  <div class="board__wrap">
        <div class="board grid grid-cols-3 gap-2 p-2">
          <div class="cell cell-o" data-cell></div>
          <div class="cell cell-x" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
        </div>
      </div>
 `;
};

export const startGame = (): void => {
  logoH1.classList.add('logo-sm');
  gameDiv.innerHTML = createPlaceHoldersHTML();
  document.getElementById('quit')?.addEventListener('click', () => {
    const sure = confirm('Are you sure you want to quit and lose the game?');
    if (sure) {
      //   stopGame('quit');
    }
  });
};

// const board: HTMLElement | null = document.getElementById('board');
// const cells: NodeListOf<Element> = document.querySelectorAll('[data-cell]');
// const winningCombinations: number[][] = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// let currentPlayer: 'X' | 'O' = 'X';

// cells.forEach((cell) => {
//   cell.addEventListener('click', handleCellClick);
// });

// function handleCellClick(event: Event) {
//   const cell = event.target as HTMLElement;

//   if (cell.textContent === '') {
//     cell.textContent = currentPlayer;
//     cell.classList.add(currentPlayer.toLowerCase());

//     if (checkWin(currentPlayer)) {
//       setTimeout(() => {
//         alert(currentPlayer + ' wins');
//         resetBoard();
//       }, 100);
//     } else if (isBoardFull()) {
//       setTimeout(() => {
//         alert("It's a tie!");
//         resetBoard();
//       }, 100);
//     } else {
//       currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//       if (currentPlayer === 'O') {
//         makeAIMove();
//       }
//     }
//   }
// }

// function checkWin(player: 'X' | 'O'): boolean {
//   return winningCombinations.some((combination) => {
//     return combination.every((index) => cells[index].textContent === player);
//   });
// }

// function isBoardFull(): boolean {
//   return [...cells].every((cell) => cell.textContent !== '');
// }

// function resetBoard() {
//   cells.forEach((cell) => {
//     cell.textContent = '';
//     cell.classList.remove('o', 'x');
//   });
//   currentPlayer = 'X';
// }

// function makeAIMove() {
//   const emptyCells = [...cells].filter((cell) => cell.textContent === '');
//   const randomIndex = Math.floor(Math.random() * emptyCells.length);
//   const cell = emptyCells[randomIndex] as HTMLElement;

//   setTimeout(() => {
//     cell.textContent = currentPlayer;
//     cell.classList.add(currentPlayer.toLowerCase());
//     if (checkWin(currentPlayer)) {
//       setTimeout(() => {
//         alert(currentPlayer + ' wins!');
//         resetBoard();
//       }, 100);
//     } else if (isBoardFull()) {
//       setTimeout(() => {
//         alert("It's a tie!");
//         resetBoard();
//       }, 100);
//     } else {
//       currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     }
//   }, 500);
// }
