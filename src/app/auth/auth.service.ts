import { HttpClient, HttpErrorResponse, HttpContext } from '@angular/common/http';
import { catchError, Observable, throwError, of, tap } from 'rxjs';
import { SignUpUserInterface } from './sign-up/sign-up.interface';
import { SignInUserInterface } from './sign-in/sign-in.interface';
import { AuthenticatedUser, TokenResponse } from './auth.interface';
import { DestroyRef, Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IS_PUBLIC } from "./auth.interceptor";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { environment } from '../../environments/environment';
import { ResetPasswordInterface } from './reset-password/reset-password.interface';
import { TwoStepVerificationInterface } from './two-step-verification/two-step-verification.interface';
import { DashboardRoutes } from '../panel/dashboard/dashboard.routes';
import { AuthRoutes } from './auth.routes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal: WritableSignal<AuthenticatedUser | null> = signal(null);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  private readonly TOKEN_EXPIRY_THRESHOLD_MINUTES = 1;

  constructor() { }

  createUser(user: SignUpUserInterface) {
    const url = `${environment.apiUrl}auth/registration/`

    return this.http.post<SignUpUserInterface>(
      url,
      user,{
        ...this.CONTEXT,
        observe: 'response'
      }
    )
    .pipe(catchError(this.handleError))
  }

  logInUser(user: SignInUserInterface) {
    const url = `${environment.apiUrl}auth/login/`

    return this.http.post<SignInUserInterface>(
      url,
      user,
      {
        ...this.CONTEXT,
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  };

  loadUserData(): void {
    const userDataString = localStorage.getItem('00_user');
    if (userDataString) {
      const user = JSON.parse(userDataString)
      this.currentUserSignal.set(user as AuthenticatedUser);
    } else {
      this.currentUserSignal.set(null);
    }
  }
  get currentUser(): WritableSignal<AuthenticatedUser | null> {
    this.loadUserData()
    return this.currentUserSignal;
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  storeTokens(token: TokenResponse): void {
    localStorage.setItem('00_access', token.access);
    if(token.refresh)
      localStorage.setItem('00_refresh', token.refresh);
    if(token.user)
      localStorage.setItem('00_user', JSON.stringify(token.user));
  }

  refreshToken() {
    const refresh_token = localStorage.getItem('00_refresh');
    if (!refresh_token) {
      return of();
    }
    console.log('refreshToken called')

    return this.http.post<TokenResponse>(
      `${environment.apiUrl}auth/token/refresh/`,
      {refresh: refresh_token},
      this.CONTEXT
    )
    .pipe(
      catchError(() => of()),
      tap(data => {
        console.log('refreshToken data')
        this.storeTokens(data);
        this.scheduleTokenRefresh(data);
      })
    );
  }

  scheduleTokenRefresh(token: TokenResponse): void {
    console.log('scheduleTokenRefresh called')
    const expirationTime = this.jwtHelper.getTokenExpirationDate(token.access)?.getTime();
    const refreshTime = expirationTime ? expirationTime - this.TOKEN_EXPIRY_THRESHOLD_MINUTES * 60 * 1000 : Date.now();
    const refreshInterval = refreshTime - Date.now();

    if (refreshInterval > 0) {
      setTimeout(() => {
        this.refreshToken()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }, refreshInterval);
    }
  }

  logOutUser(): void {
    const refresh_token = localStorage.getItem('00_refresh');
    this.http.post(
      `${environment.apiUrl}auth/logout/`,
      {refresh: refresh_token},
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      localStorage.removeItem('00_access');
      localStorage.removeItem('00_refresh');
      localStorage.removeItem('00_user');
      localStorage.removeItem('00_businesses');
      this.currentUserSignal.set(null)
      this.router.navigate([AuthRoutes.signIn]);
    });
  }

  forgotUserPassword(email: string) {
    const url = `${environment.apiUrl}auth/password/reset/`

    return this.http.post<SignInUserInterface>(
      url,
      email,
      {
        ...this.CONTEXT,
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  resetUserPassword(resetUser: ResetPasswordInterface) {
    const url = `${environment.apiUrl}auth/password/reset/confirm/`

    return this.http.post<SignInUserInterface>(
      url,
      resetUser,
      {
        ...this.CONTEXT,
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  verifyUser(verifyUser: TwoStepVerificationInterface) {
    const url = `${environment.apiUrl}auth/two/step/verification/`

    return this.http.post<SignInUserInterface>(
      url,
      verifyUser,
      {
        ...this.CONTEXT,
        observe: 'response',
      },
    )
    .pipe(catchError(this.handleError))
  }

  public redirectToDashbordPage = () => { this.router.navigate([DashboardRoutes.adminDashboard]); }
  public redirectToLoginPage = () => { this.router.navigate([AuthRoutes.signIn]); }
  public redirectToForgotPasswordPage = () => { this.router.navigate([AuthRoutes.forgotPassword]); }
  public redirectToResetPasswordPage = () => { this.router.navigate([AuthRoutes.resetPassword]); }
  public redirectToResetPasswordSuccessPage = () => { this.router.navigate([AuthRoutes.resetPasswordSuccess]); }

}
