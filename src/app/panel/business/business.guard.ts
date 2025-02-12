import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BusinessService } from './business.service';
import { Router } from '@angular/router';
import { BusinessRoutes } from './business.routes';
import { map } from 'rxjs';


export const businessGuard: CanActivateFn = () => {
  const businessService = inject(BusinessService);
  const router = inject(Router);

  const business =  businessService.loadBusinessesLocally()
  if (business.length > 0) {
    return true
  }
  return businessService.fetchMyBusinesses().pipe(
    map((hasBusinesses: boolean) => {
      console.log('global checked')
      if (!hasBusinesses) {
        return router.parseUrl(BusinessRoutes.addBusiness);
      }
      return true; // Allow access to the route
    })
  );


};



