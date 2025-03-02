import { Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { BUSINESS_ROUTES, QUICK_BUSINESS_ROUTES } from './business/business.routes';
import { authenticationGuard } from '../auth/auth.guard';
import { businessGuard } from './business/business.guard';
import { INVENTORY_ROUTES } from './inventory/inventory.routes';

export const PANEL_ROUTES: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [
      authenticationGuard,
      // businessGuard,
    ],
    children: [
      {
        path: '',
        children: [
          ...DASHBOARD_ROUTES,
          ...INVENTORY_ROUTES,
          ...BUSINESS_ROUTES,
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
          ...QUICK_BUSINESS_ROUTES,
        ]
      },
    ],
  },
];

