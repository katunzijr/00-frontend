import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
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
