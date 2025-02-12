import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BusinessInterface, LocalBusinessesInterface, ObjectInterface } from './business.interface';
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

    return this.http.get<ObjectInterface>(
      url,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  fetchMyBusinesses(): Observable<boolean> {
    const url = `${environment.apiUrl}api/business/businesses/mybusinesses/`;

    return this.http.get<ObjectInterface>(url).pipe(
      map((response: ObjectInterface) => {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  };

}
