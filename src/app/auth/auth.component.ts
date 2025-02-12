import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { SettingsService } from '../core/service/settings/settings.service';
import { url } from '../shared/model/sidebar.model';
import { AuthRoutes } from './auth.routes';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public themeMode: string = '';
  page = '';

  constructor(
    private Router: Router,
    private settings: SettingsService,
    private renderer: Renderer2
  ) {
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
    });

    this.settings.themeMode.subscribe((mode) => {
      this.themeMode = mode;
    });

      this.settings.themeMode.subscribe((res: string) => {
        if (res === 'dark_mode') {
          this.renderer.addClass(document.body, 'dark-select');
        } else {
          this.renderer.removeClass(document.body, 'dark-select');
        }
      });

    this.getRoutes(this.Router);
  }

  private getRoutes(data: url): void {
    const splitVal = data.url.split('/');
    this.page = splitVal[2];
  }

}
