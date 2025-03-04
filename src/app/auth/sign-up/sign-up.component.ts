import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { emailDomainValidator } from '../validators/email.domain';
import { finalize } from 'rxjs';
import { AuthRoutes } from '../auth.routes';
import { passwordMatchValidator } from '../validators/password';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  excludedHosts = [
    { host: 'eyesondigit.com' },
    { host: 'eyesondigits.com' },
  ];

  public readonly routes = AuthRoutes;
  isSigningUp: boolean = false;

  signUpFormGroup: FormGroup;
  router = inject(Router)

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signUpFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailDomainValidator(this.excludedHosts)]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password2: ['', Validators.required],
      username: ['', Validators.required],
    },
    { validator: passwordMatchValidator('password1', 'password2') }
  );
  }

  createUser() {
    this.isSigningUp = true
    this.authService.createUser({
      username: this.signUpFormGroup.value.username,
      email: this.signUpFormGroup.value.email,
      password1: this.signUpFormGroup.value.password1,
      password2: this.signUpFormGroup.value.password2,
    })
    .pipe(
      finalize(() => {
        this.isSigningUp = false;
      })
    )
    .subscribe({
      next: (data): void => {
        localStorage.removeItem('00_businesses');
        let userData: any = data
        this.authService.storeTokens(userData.body);
        this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
      },
    })
  }

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

}
