import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ObjectInterface } from './header.interface';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private readonly http = inject(HttpClient);

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

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  };
}
