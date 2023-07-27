import '../css/style.css';
import { darkModeHandler } from './utils';
import { startGame } from './game';

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

const aiModeButtonEasy: HTMLButtonElement | null = document.getElementById(
  'aiMode-easy'
) as HTMLButtonElement;
const aiModeButtonMedium: HTMLButtonElement | null = document.getElementById(
  'aiMode-medium'
) as HTMLButtonElement;
const aiModeButtonHard: HTMLButtonElement | null = document.getElementById(
  'aiMode-hard'
) as HTMLButtonElement;

friendModeButton.addEventListener('click', () => {
  startGame(GameMode.Friend);
});

aiModeButtonEasy.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Easy);
});
aiModeButtonMedium.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Medium);
});
aiModeButtonHard.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Hard);
});

darkModeHandler();
