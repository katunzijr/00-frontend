import { Routes } from '@angular/router';

// import { LANDING_PAGE_ROUTES } from './landing-page/landing-page.routes';
import { AUTH_ROUTES } from './auth/auth.routes';
import { PANEL_ROUTES } from './panel/panel.routes';
import { Error404Component } from './error-page/error-404/error-404.component';

export class AppRoutes {
  private static base = '';

  public static get panel(): string {
    return this.base + '';
  }
}

export const routes: Routes = [
  {
    path: AppRoutes.panel,
    children: [
      ...PANEL_ROUTES,
      ...AUTH_ROUTES,
    ]
  },
  {
    path: '**',
    component: Error404Component
  },
];

