import { Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { BUSINESS_ROUTES } from './business/business.routes';
import { authenticationGuard } from '../auth/auth.guard';

export const PANEL_ROUTES: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        children: [
          ...DASHBOARD_ROUTES,
        ]
      },
    ],
  },{
    path: '',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        children: [
          ...BUSINESS_ROUTES,
        ]
      },
    ],
  },
];

