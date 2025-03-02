import { Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { authenticationGuard } from '../../auth/auth.guard';
import { QuickAddBusinessComponent } from './quick-business/quick-add-business/quick-add-business.component';
import { ListBusinessesComponent } from './list-businesses/list-businesses.component';
import { QuickAddBranchesComponent } from './quick-business/quick-add-branch/quick-add-branch.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { QuickBusinessComponent } from './quick-business/quick-business.component';

export class BusinessRoutes {
  private static base = '';

  public static get business(): string {
    return this.base + 'business';
  }

  public static get addBusiness(): string {
    return  this.business + '/add-business';
  }
  public static get editBusiness(): string {
    return  this.business + '/edit-business';
  }
  public static get viewBusinesses(): string {
    return  this.business + '/view-businesses';
  }
  public static get listBusinesses(): string {
    return  this.business + '/list-businesses';
  }

  public static get quickAddBusiness(): string {
    return  this.business + '/quick/add-business';
  }
  public static get quickAddBranches(): string {
    return this.business + '/quick/add-branches';
  }

}

export const BUSINESS_ROUTES: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: BusinessRoutes.listBusinesses },
      { path: BusinessRoutes.addBusiness, component: AddBusinessComponent },
      { path: BusinessRoutes.listBusinesses, component: ListBusinessesComponent },
    ]
  }
];

export const QUICK_BUSINESS_ROUTES: Routes = [
  {
    path: '',
    component: QuickBusinessComponent,
    children: [
      { path: BusinessRoutes.quickAddBusiness, component: QuickAddBusinessComponent },
      { path: BusinessRoutes.quickAddBranches, component: QuickAddBranchesComponent },
    ]
  }
];






