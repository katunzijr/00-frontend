import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { LoggingInterceptor } from './app.logging.interceptor';
import { ErrorInterceptor } from './error-page/errors.interceptor';
import { SpinnerInterceptor } from './core/interceptor/spinner/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter
        }
      })
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
    // { // old ways
    //   provide: APP_INITIALIZER,
    //   useFactory: initializerFactory,
    //   multi: true,
    //   deps: [AuthService]
    // },
  ]
};

// Refresh Token On App initialization
export function initializerFactory(authService: AuthService) {
  console.log("initializerFactory")
  return () => authService.getRefreshToken();
}

export function tokenGetter() {
  if (typeof window !== 'undefined' && localStorage) {
    console.log("tokenGetter")
    return localStorage.getItem('00_access');
  }
  return null;
}
