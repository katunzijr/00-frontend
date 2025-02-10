import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ObjectInterface } from './header.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  constructor() { }

  logInUser() {
    const registerUrl = `${environment.apiUrl}api/business/businesses/mybusinesses/`

    return this.http.get<ObjectInterface>(
      registerUrl,
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
