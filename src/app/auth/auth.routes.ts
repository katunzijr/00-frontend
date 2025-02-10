import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { accountGuard } from './auth.guard';

export class AuthRoutes {
  private static base = 'auth';

  public static get signIn(): string {
    return this.base + '/sign-in';
  }
  public static get signUp(): string {
    return this.base + '/sign-up';
  }
  public static get forgotPassword(): string {
    return this.base + '/forgot-password';
  }
  public static get emailVerification(): string {
    return this.base + '/email-verification';
  }
  public static get lockScreen(): string {
    return this.base + '/lock-screen';
  }
  public static get resetPassword(): string {
    return this.base + '/reset-password';
  }
  public static get resetPasswordSuccess(): string {
    return this.base + '/reset-password-success';
  }
  public static get twoStepVerification(): string {
    return this.base + '/two-step-verification';
  }
}

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: AuthRoutes.signIn, pathMatch: 'full' },
      { path: AuthRoutes.signIn, component: SignInComponent, canActivate: [accountGuard] },
      { path: AuthRoutes.signUp, component: SignUpComponent, canActivate: [accountGuard] },
      { path: AuthRoutes.forgotPassword, component: ForgotPasswordComponent },
      { path: AuthRoutes.emailVerification, component: EmailVerificationComponent },
      { path: AuthRoutes.lockScreen, component: LockScreenComponent },
      { path: AuthRoutes.resetPassword, component: ResetPasswordComponent },
      { path: AuthRoutes.resetPasswordSuccess, component: ResetPasswordSuccessComponent },
      { path: AuthRoutes.twoStepVerification, component: TwoStepVerificationComponent },
    ]
  }
];
