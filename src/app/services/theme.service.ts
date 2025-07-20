import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(){}
  
  toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Check if dark mode is currently active
  isDarkMode(): boolean {
    return document.documentElement.hasAttribute('data-theme');
  }
}
