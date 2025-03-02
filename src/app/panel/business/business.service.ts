import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as bnessInterfaces from './business.interface';
import { Router } from '@angular/router';
import { BusinessRoutes } from './business.routes';
import { ObjectInterface } from '../../shared/model/page.model';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() { }

  myBusinesses() {
    const url = `${environment.apiUrl}api/business/businesses/mybusinesses/`

    return this.http.get<ObjectInterface<bnessInterfaces.BusinessInterface>>(
      url,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  getMyBusinesses(): Observable<boolean> {
    const url = `${environment.apiUrl}api/business/businesses/mybusinesses/`;

    return this.http.get<ObjectInterface<bnessInterfaces.BusinessInterface>>(url).pipe(
      map((response: ObjectInterface<bnessInterfaces.BusinessInterface>) => {
        const businesses = response.results.map((business) => ({
          id: business.id,
          name: business.name
        }));
        if (businesses.length == 0) {
          return false
        }
        localStorage.setItem('00_businesses', JSON.stringify(businesses));
        this.setCurrentBusinessLocally(businesses[0]);
        return true;
      })
    );
  }

  getBusinesses(): Observable<bnessInterfaces.BusinessInterface[]> {
    const url = `${environment.apiUrl}api/business/businesses/`;

    return this.http.get<ObjectInterface<bnessInterfaces.BusinessInterface>>(url).pipe(
      map(response => response.results)
    );
  }

  loadBusinessesLocally(): bnessInterfaces.LocalBusinessInterface[] {
    const userBusinesses = localStorage.getItem('00_businesses');
    if (userBusinesses) {
      const businesses = JSON.parse(userBusinesses)
      return businesses
    }
    return []
  }

  loadCurrentBusinessLocally(): bnessInterfaces.LocalBusinessInterface | null {
    const userCurrentBusiness = localStorage.getItem('00_current_business');
    if (userCurrentBusiness) {
      const currentBusiness = JSON.parse(userCurrentBusiness)
      return currentBusiness
    }
    return null
  }

  setCurrentBusinessLocally(selectedBusiness: bnessInterfaces.LocalBusinessInterface) {{
    localStorage.setItem('00_current_business', JSON.stringify(selectedBusiness));
  }}

  getBusinessesType(): Observable<bnessInterfaces.BusinessTypeInterface[]> {
    const url = `${environment.apiUrl}api/business/business-types/`;

    return this.http.get<ObjectInterface<bnessInterfaces.BusinessTypeInterface>>(url).pipe(
      map(response => response.results)
    );
  }

  registerBusiness(business: bnessInterfaces.AddBusinessInterface) {
    const url = `${environment.apiUrl}api/business/businesses/`

    return this.http.post<bnessInterfaces.BusinessInterface>(
      url,
      business,
      {
        observe: 'response',
      },
    )
    .pipe(
      tap(response => {
        if (response.body) {
          this.setCurrentBusinessLocally({
            id: response.body.id,
            name: response.body.name
          });
        }
      }),
      catchError(this.handleError)
    )
  }

  getBranches(): Observable<bnessInterfaces.BranchInterface[]> {
    const url = `${environment.apiUrl}api/business/business-branchs/`;

    return this.http.get<ObjectInterface<bnessInterfaces.BranchInterface>>(url).pipe(
      map(response => response.results)
    );
  }

  registerBranches(business: bnessInterfaces.AddBranchInterface) {
    const url = `${environment.apiUrl}api/business/business-branchs/`

    return this.http.post<object>(
      url,
      business,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {

    return of();
  };

}
