import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Theme store with localStorage persistence
function createTheme() {
  const defaultTheme: Theme = 'dark';
  const initialTheme: Theme = browser 
    ? (localStorage.getItem('tm-theme') as Theme) || defaultTheme
    : defaultTheme;
  
  const { subscribe, set, update } = writable<Theme>(initialTheme);
  
  return {
    subscribe,
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('tm-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
      }
      set(theme);
    },
    toggle: () => update(theme => {
      const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
      if (browser) {
        localStorage.setItem('tm-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return newTheme;
    })
  };
}

export const theme = createTheme();