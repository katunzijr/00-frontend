import { Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { authenticationGuard } from '../../auth/auth.guard';
import { AddBusinessComponent } from './add-business/add-business.component';
import { AddBranchesComponent } from './add-branches/add-branches.component';

export class BusinessRoutes {
  private static base = '';

  public static get business(): string {
    return this.base + 'business';
  }

  public static get addBusiness(): string {
    return  this.business + '/add-business';
  }
  public static get addBranches(): string {
    return this.business + '/add-branches';
  }

}

export const BUSINESS_ROUTES: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: BusinessRoutes.addBusiness },
      { path: BusinessRoutes.addBusiness, component: AddBusinessComponent },
      { path: BusinessRoutes.addBranches, component: AddBranchesComponent },
    ]
  }
];






