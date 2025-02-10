import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.forgotPasswordGroup = this.fb.group({
      email: ['minachekagatu@gmail.com', [Validators.required, Validators.email]],
    });
  }

  forgotTheUserPassword() {
    this.authService.forgotUserPassword(
      this.forgotPasswordGroup.value.email,
    )
    .subscribe({
      next: (data): void => {
        const userData: any = data;
        // ...
        this.authService.redirectToResetPasswordPage();
      },
      error: (error: HttpErrorResponse): void => {
        // this.authService.currentUserSignal.set(null)

        if (error instanceof EvalError || error.status == 0) {
          // this.toastService.showError('There is an issue with the network. Please try again.');
          console.log('There is an issue with the network. Please try again.');
        }
        else if(error.status == 403) {
          console.log(error.error.detail);
        }
        else if(error.status == 400) {
          error.error.non_field_errors.forEach((item: string) => {console.log(item)})
        }
        console.log(error)
      }
    })
  }

}
