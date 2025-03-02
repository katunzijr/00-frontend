import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthRoutes } from '../auth.routes';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  public readonly routes = AuthRoutes;
  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

  resetPasswordGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.resetPasswordGroup = this.fb.group({
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required],
    });
  }

  resetTheUserPassword() {
    this.authService.resetUserPassword({
      new_password1: this.resetPasswordGroup.value.new_password1,
      new_password2: this.resetPasswordGroup.value.new_password2,
      uid: 'jdfs',
      token: 'jhgfd-ftyah-sfwkjdw-wdkjwdjw',
  })
    .subscribe({
      next: (data): void => {
        const userData: any = data;
        // ...
        this.authService.redirectToResetPasswordSuccessPage();
      },
    })
  }

}
