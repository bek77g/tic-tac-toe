import '../css/style.css';
import { darkModeHandler } from './utils';
import { startGame } from './game';

darkModeHandler();

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export enum GameMode {
  Friend,
  AI,
}

const friendModeButton: HTMLButtonElement | null = document.getElementById(
  'friendMode'
) as HTMLButtonElement;
const aiModeButton: HTMLButtonElement | null = document.getElementById(
  'aiMode'
) as HTMLButtonElement;

friendModeButton.addEventListener('click', () => {
  startGame(GameMode.Friend);
});

aiModeButton.addEventListener('click', () => {
  startGame(GameMode.AI);
});
