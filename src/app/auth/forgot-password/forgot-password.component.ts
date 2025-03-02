import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from '../auth.routes';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public readonly routes = AuthRoutes;

  forgotPasswordGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.forgotPasswordGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    })
  }

}
