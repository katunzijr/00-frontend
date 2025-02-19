import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AddBusinessInterface, BusinessInterface, BusinessTypeInterface, LocalBusinessesInterface, ObjectInterface } from './business.interface';
import { Router } from '@angular/router';
import { BusinessRoutes } from './business.routes';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() { }

  myBusinesses() {
    const url = `${environment.apiUrl}api/business/businesses/mybusinesses/`

    return this.http.get<ObjectInterface<BusinessInterface>>(
      url,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  getMyBusinesses(): Observable<boolean> {
    const url = `${environment.apiUrl}api/business/businesses/mybusinesses/`;

    return this.http.get<ObjectInterface<BusinessInterface>>(url).pipe(
      map((response: ObjectInterface<BusinessInterface>) => {
        const businesses = response.results.map((business) => ({
          id: business.id,
          name: business.name
        }));
        if (businesses.length == 0) {
          return false
        }
        this.storeBusinessesLocally(businesses)
        return true;
      })
    );
  }

  storeBusinessesLocally(businesses: LocalBusinessesInterface[]): void {
    localStorage.setItem('00_businesses', JSON.stringify(businesses));
  }

  loadBusinessesLocally(): LocalBusinessesInterface[] {
    const userBusinesses = localStorage.getItem('00_businesses');
    if (userBusinesses) {
      const businesses = JSON.parse(userBusinesses)
      return businesses
    }
    return []
  }

  getBusinessesType(): Observable<BusinessTypeInterface[]> {
    const url = `${environment.apiUrl}api/business/business-types/`;

    return this.http.get<ObjectInterface<BusinessTypeInterface>>(url).pipe(
      map(response => response.results)
    );
  }

  registerBusiness(business: AddBusinessInterface) {
    const url = `${environment.apiUrl}api/business/businesses/`

    return this.http.post<object>(
      url,
      business,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  };

}
