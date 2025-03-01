import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService} from "../auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthRoutes } from '../auth.routes';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: '../auth.component.scss'
})
export class SignInComponent {

  isSigningIn: boolean = false;
  signInFormGroup: FormGroup;
  router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  public authRoutes = AuthRoutes;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.signInFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginTheUser() {
    this.isSigningIn = true
    this.authService.logInUser({
      email: this.signInFormGroup.value.email,
      password: this.signInFormGroup.value.password,
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (data): void => {
        localStorage.removeItem('00_businesses');
        const userData: any = data;
        this.authService.storeTokens(userData.body);
        // this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
        this.isSigningIn = false
      },
      error: (error: HttpErrorResponse): void => {
        this.isSigningIn = false
        // this.authService.currentUserSignal.set(null)

        if (error instanceof EvalError || error.status == 0) {
          this.toastService.showError('There is an issue with the network. Please try again.');
        }
        else if(error.status == 403) {
          this.toastService.showError(error.error.detail);
        }
        else if(error.status == 400) {
          error.error.non_field_errors.forEach((item: string) => {this.toastService.showError(item);})
        }
        console.log(error)
      }
    })
  }

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

}
