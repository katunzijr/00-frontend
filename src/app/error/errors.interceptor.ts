import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  toastService = inject(ToastService);

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof EvalError || error.status == 0) {
          this.toastService.showError('There is an issue! Check your network Or Contact support.');
        }
        else if(error.status == 403) {
          this.toastService.showError(error.error.detail);
        }
        else if(error.status == 400) {
          if (error.error.non_field_errors)
            error.error.non_field_errors.forEach((item: string) => {this.toastService.showError(item);})
        }

        return throwError(() => error);
      })
    );
  }
}
