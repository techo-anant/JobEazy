import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly darkClass = 'dark';
  private platformId = inject(PLATFORM_ID);

  darkMode = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.darkMode.set(true);
        document.documentElement.classList.add(this.darkClass);
      }
    }
  }

  toggleTheme(): void {
    const isDark = !this.darkMode();
    this.darkMode.set(isDark);

    if (isPlatformBrowser(this.platformId)) { // ✅ Check here
      if (isDark) {
        document.documentElement.classList.add(this.darkClass);
      } else {
        document.documentElement.classList.remove(this.darkClass);
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

}
