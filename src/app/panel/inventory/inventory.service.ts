import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as inventoryInterfaces from './inventory.interface';
import { Router } from '@angular/router';
import { InventoryRoutes } from './inventory.routes';
import { ObjectInterface } from '../../shared/model/page.model';
import { ToastService } from '../../shared/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private routes = InventoryRoutes;
  private baseUrl = `${environment.apiUrl}api/`

  constructor() { }

  addProduct(product: inventoryInterfaces.AddProductInterface) {
    const url = `${this.baseUrl}product/products/`

    return this.http.post<inventoryInterfaces.ProductInterface>(
      url,
      product,
      {
        observe: 'response',
      },
    )
    .pipe(
      catchError(this.handleError)
    )
  }

  getProducts(): Observable<ObjectInterface<inventoryInterfaces.ProductInterface>> {
    const url = `${this.baseUrl}product/products/`
    return this.http.get<ObjectInterface<inventoryInterfaces.ProductInterface>>(url);
  }

  getProduct(productId: number): Observable<inventoryInterfaces.ProductInterface> {
    const url = `${this.baseUrl}product/products/${productId}/`
    return this.http.get<inventoryInterfaces.ProductInterface>(url)
    .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}product/products/${productId}/`)
    .pipe(catchError(this.handleError));
  }

  // getBusinessesType(): Observable<inventoryInterfaces.BusinessTypeInterface[]> {
  //   const url = `${environment.apiUrl}api/business/business-types/`;

  //   return this.http.get<ObjectInterface<inventoryInterfaces.BusinessTypeInterface>>(url).pipe(
  //     map(response => response.results)
  //   );
  // }

  // registerBusiness(business: inventoryInterfaces.AddBusinessInterface) {
  //   const url = `${environment.apiUrl}api/business/businesses/`

  //   return this.http.post<inventoryInterfaces.BusinessInterface>(
  //     url,
  //     business,
  //     {
  //       observe: 'response',
  //     },
  //   )
  //   .pipe(
  //     tap(response => {
  //       if (response.body) {
  //       }
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if(error.status == 404) {
      if (error.error.detail)
        this.toastService.showError(error.error.detail);
        this.router.navigate([this.routes.inventory]);
    }
    return of();
  };

}
