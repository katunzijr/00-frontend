import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export class DashboardRoutes {
  private static base = '';

  public static get dashboard(): string {
    return this.base + 'dashboard';
  }

  public static get salesDashboard(): string {
    return this.dashboard + '/sales-dashboard';
  }
  public static get adminDashboard(): string {
    return this.dashboard + '/admin-dashboard';
  }
}

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: DashboardRoutes.adminDashboard },
      { path: DashboardRoutes.adminDashboard, component: AdminDashboardComponent },
      { path: DashboardRoutes.salesDashboard, component: SalesDashboardComponent }
    ]
  }
];






