import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { emailDomainValidator } from '../validators/email.domain';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  excludedHosts = [
    { host: 'eyesondigit.com' },
    { host: 'eyesondigits.com' },
  ];

  signUpFormGroup: FormGroup;
  router = inject(Router)

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.signUpFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailDomainValidator(this.excludedHosts)]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  createUser() {
    this.authService.createUser(
      {
        username: this.signUpFormGroup.value.username,
        email: this.signUpFormGroup.value.email,
        password1: this.signUpFormGroup.value.password1,
        password2: this.signUpFormGroup.value.password2,
      }
    ).subscribe({
      next: (data): void => {
        console.log(data)
        let userData: any = data
        this.authService.storeTokens(userData.body);
        this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
      },
      error: (error: HttpErrorResponse): void => {
        if (error instanceof EvalError || error.status == 0) {
          // this.toastService.showError('There is an issue with the network. Please try again.');
          console.log('There is an issue with the network. Please try again.');
        }
        else if (error.status == 403) {
          console.log(error.error.detail);
        }
        else if (error.status == 400) {
          if (error.error.username) {
            error.error.username.forEach((item: string) => {console.log(item)})
          }
          else if (error.error.email) {
            error.error.email.forEach((item: string) => {console.log(item)})
          }
          else if (error.error.non_field_errors) {
            error.error.non_field_errors.forEach((item: string) => {console.log(item)})
          }
        }
        // console.log(error)
      }
    })
  }

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

}
