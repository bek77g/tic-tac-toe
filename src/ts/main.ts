import '../css/style.css';
import { Difficulty, GameMode, darkModeHandler } from './utils';
import { initGame, startGame } from './game';

darkModeHandler();
initGame();

const friendModeButton: HTMLButtonElement = document.getElementById(
  'friendMode'
) as HTMLButtonElement;

friendModeButton.addEventListener('click', () => {
  startGame(GameMode.Friend);
});

const aiModeButtonEasy: HTMLButtonElement = document.getElementById(
  'aiMode-easy'
) as HTMLButtonElement;
const aiModeButtonMedium: HTMLButtonElement = document.getElementById(
  'aiMode-medium'
) as HTMLButtonElement;
const aiModeButtonHard: HTMLButtonElement = document.getElementById(
  'aiMode-hard'
) as HTMLButtonElement;

aiModeButtonEasy.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Easy);
});
aiModeButtonMedium.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Medium);
});
aiModeButtonHard.addEventListener('click', () => {
  startGame(GameMode.AI, Difficulty.Hard);
});
