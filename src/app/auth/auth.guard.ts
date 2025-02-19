import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DashboardRoutes } from '../panel/dashboard/dashboard.routes';
import { AuthRoutes } from './auth.routes';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.parseUrl(AuthRoutes.signIn);
  }

  return true;
};


export const accountGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.parseUrl(DashboardRoutes.adminDashboard);
  }

  return true;
};

