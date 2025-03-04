import { HttpClient, HttpErrorResponse, HttpContext } from '@angular/common/http';
import { catchError, Observable, throwError, of, tap, lastValueFrom, EMPTY, finalize } from 'rxjs';
import { AuthenticatedUser, ResetPasswordInterface, SignInUserInterface, SignUpUserInterface, TokenResponse } from './auth.interface';
import { DestroyRef, Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IS_PUBLIC } from "./auth.interceptor";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { environment } from '../../environments/environment';
import { TwoStepVerificationInterface } from './two-step-verification/two-step-verification.interface';
import { DashboardRoutes } from '../panel/dashboard/dashboard.routes';
import { AuthRoutes } from './auth.routes';
import { ToastService } from '../shared/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal: WritableSignal<AuthenticatedUser | null> = signal(null);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
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

  getUserData(): void {
    const userDataString = localStorage.getItem('00_user');
    if (userDataString) {
      const user = JSON.parse(userDataString)
      this.currentUserSignal.set(user as AuthenticatedUser);
    } else {
      this.currentUserSignal.set(null);
    }
  }

  get currentUser(): WritableSignal<AuthenticatedUser | null> {
    this.getUserData()
    return this.currentUserSignal;
  }

  isAuthenticated(): boolean {
    // if (!this.jwtHelper.isTokenExpired())
    //   return true;
    // return false;

    return !this.jwtHelper.isTokenExpired() ? true : false;
  }

  storeTokens(token: TokenResponse): void {
    localStorage.setItem('00_access', token.access);
    if(token.refresh)
      localStorage.setItem('00_refresh', token.refresh);
    if(token.user)
      localStorage.setItem('00_user', JSON.stringify(token.user));
  }

  getRefreshToken() {
    const refresh_token = localStorage.getItem('00_refresh');
    if (!refresh_token) {
      return of();
    }

    return this.http.post<TokenResponse>(
      `${environment.apiUrl}auth/token/refresh/`,
      { refresh: refresh_token },
      this.CONTEXT
    )
    .pipe(
      catchError(
        (error) => {
          console.log(error)
          if (error.status == 401) {
            this.clearUserData();
          }
          return of();
        }
      ),
      tap(data => {
        this.storeTokens(data);
        // this.scheduleTokenRefresh(data);
      })
    );
  }

  // Refresh few minutes before expiration time
  scheduleTokenRefresh(token: TokenResponse): void {
    console.log('A few minutes before expiration time')
    const expirationTime = this.jwtHelper.getTokenExpirationDate(token.access)?.getTime();
    const refreshTime = expirationTime ? expirationTime - this.TOKEN_EXPIRY_THRESHOLD_MINUTES * 60 * 1000 : Date.now();
    const refreshInterval = refreshTime - Date.now();

    if (refreshInterval > 0) {
      setTimeout(() => {
        this.getRefreshToken()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }, refreshInterval);
    }
  }

  logOutUser(): void {
    const refresh_token = localStorage.getItem('00_refresh');
    // if (!refresh_token) {
    //   this.router.navigate([AuthRoutes.signIn]);
    //   return; // Stop further execution
    // }

    this.http.post(
      `${environment.apiUrl}auth/logout/`,
      { refresh: refresh_token },
    )
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        if (error.status == 401) {
          this.clearUserData();
          this.router.navigate([AuthRoutes.signIn]);
          console.log("Navigating due to 401 error");
          return EMPTY;
        }
        return throwError(() => error);
      })
    )
    .subscribe(() => {
      this.clearUserData();
      this.currentUserSignal.set(null);
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

  private clearUserData() {
    localStorage.removeItem('00_access');
    localStorage.removeItem('00_refresh');
    localStorage.removeItem('00_user');
    localStorage.removeItem('00_businesses');
    localStorage.removeItem('00_current_business');
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if(error.status == 400) {
      if (error.error.username)
        error.error.username.forEach((item: string) => {this.toastService.showError(item);})
      if (error.error.email)
        error.error.email.forEach((item: string) => {this.toastService.showError(item);})
    }

    return of();
  };

  public redirectToDashbordPage = () => { this.router.navigate([DashboardRoutes.adminDashboard]); }
  public redirectToLoginPage = () => { this.router.navigate([AuthRoutes.signIn]); }
  public redirectToForgotPasswordPage = () => { this.router.navigate([AuthRoutes.forgotPassword]); }
  public redirectToResetPasswordPage = () => { this.router.navigate([AuthRoutes.resetPassword]); }
  public redirectToResetPasswordSuccessPage = () => { this.router.navigate([AuthRoutes.resetPasswordSuccess]); }

}

