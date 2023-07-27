import '../css/style.css';
import { darkModeHandler } from './utils';
import { startGame } from './game';
import { Difficulty } from './ai';

darkModeHandler();

export enum GameMode {
  Friend,
  AI,
}

const friendModeButton: HTMLButtonElement = document.getElementById(
  'friendMode'
) as HTMLButtonElement;

const aiModeButtonEasy: HTMLButtonElement = document.getElementById(
  'aiMode-easy'
) as HTMLButtonElement;
const aiModeButtonMedium: HTMLButtonElement = document.getElementById(
  'aiMode-medium'
) as HTMLButtonElement;
const aiModeButtonHard: HTMLButtonElement = document.getElementById(
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
