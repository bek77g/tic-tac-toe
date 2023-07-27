export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export enum GameMode {
  Friend,
  AI,
}

export const darkModeHandler = (): void => {
  console.log('used');

  const darkModeSwitcher: HTMLInputElement | null = document.getElementById(
    'toggleDarkMode'
  ) as HTMLInputElement | null;
  const htmlElement: HTMLElement = document.documentElement;

  if (localStorage.getItem('mode') === 'dark') {
    htmlElement.classList.add('dark');
    if (darkModeSwitcher) {
      darkModeSwitcher.checked = true;
    }
  }

  if (darkModeSwitcher) {
    darkModeSwitcher.addEventListener('input', () => {
      htmlElement.classList.toggle('dark');

      if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    });
  }
};
