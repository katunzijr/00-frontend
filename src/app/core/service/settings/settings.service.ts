import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public themeMode: BehaviorSubject<string>;
  public layoutMode: BehaviorSubject<string>;
  public navigationColor: BehaviorSubject<string>;

  constructor() {
    // Initialize BehaviorSubjects with default values or stored values
    this.themeMode = new BehaviorSubject<string>(
      localStorage.getItem('themeMode') || 'light_mode'
    );

    this.layoutMode = new BehaviorSubject<string>(
      localStorage.getItem('layoutMode') || 'default_mode'
    );

    this.navigationColor = new BehaviorSubject<string>(
      localStorage.getItem('navigationColor') || 'light_color'
    );
  }

  public changeThemeMode(theme: string): void {
    this.themeMode.next(theme);
    localStorage.setItem('themeMode', theme);
  }

  public changeLayoutMode(layout: string): void {
    this.layoutMode.next(layout);
    localStorage.setItem('layoutMode', layout);
  }

  public changeNavigationColor(color: string): void {
    this.navigationColor.next(color);
    localStorage.setItem('navigationColor', color);
  }

}

