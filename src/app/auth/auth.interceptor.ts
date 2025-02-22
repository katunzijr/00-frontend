import { HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { switchMap } from "rxjs/operators";


export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (request.context.get(IS_PUBLIC)) {
    return next(request);
  }

  // if (authService.isAuthenticated()) {
  //   const authenticatedRequest = addAuthorizationHeader(request);
  //   return next(authenticatedRequest);
  // }

  // return authService.getRefreshToken().pipe(
  //   switchMap(() => {
  //     const authenticatedRequest = addAuthorizationHeader(request);
  //     return next(authenticatedRequest);
  //   })
  // );

  return authService.isAuthenticated()
    ? next(addAuthorizationHeader(request))
    : authService.getRefreshToken().pipe(
        switchMap(() => next(addAuthorizationHeader(request)))
      );

};

const addAuthorizationHeader = (request: HttpRequest<any>) => {
  const access_token = localStorage.getItem('00_access');
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${access_token}`)
  });
};

export const IS_PUBLIC = new HttpContextToken(() => false);
