import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService} from "../auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthRoutes } from '../auth.routes';
import { finalize } from 'rxjs';

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
  public readonly routes = AuthRoutes;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    var rememberEmail = localStorage.getItem('00_remember_email');
    var rememberMe = localStorage.getItem('00_remember_me') === 'true';
    this.signInFormGroup = this.fb.group({
      email: [rememberEmail, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [rememberMe, ],
    });
  }

  loginTheUser() {
    this.isSigningIn = true
    if (this.signInFormGroup.value.rememberMe) {
      localStorage.setItem('00_remember_me', this.signInFormGroup.value.rememberMe);
      localStorage.setItem('00_remember_email', this.signInFormGroup.value.email);
    }
    else {
      localStorage.removeItem('00_remember_me');
      localStorage.removeItem('00_remember_email');
    }
    this.authService.logInUser({
      email: this.signInFormGroup.value.email,
      password: this.signInFormGroup.value.password,
    })
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isSigningIn = false;
      })
    )
    .subscribe({
      next: (data): void => {
        localStorage.removeItem('00_businesses');
        const userData: any = data;
        this.authService.storeTokens(userData.body);
        // this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
      },
    })
  }

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

}
