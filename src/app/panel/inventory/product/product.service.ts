import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as productInterfaces from './product.interface';
import { ObjectInterface } from '../../../shared/model/page.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  // private readonly router = inject(Router);

  constructor() { }

  getProducts() {
    const url = `${environment.apiUrl}api/product/products/`

    return this.http.get<ObjectInterface<productInterfaces.ProductInterface>>(
      url,
      {
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  // getBusinessesType(): Observable<bnessInterfaces.BusinessTypeInterface[]> {
  //   const url = `${environment.apiUrl}api/business/business-types/`;

  //   return this.http.get<ObjectInterface<bnessInterfaces.BusinessTypeInterface>>(url).pipe(
  //     map(response => response.results)
  //   ).pipe(catchError(this.handleError));
  // }

  private handleError = (error: HttpErrorResponse): Observable<never> => {

    return of();
  };

}
