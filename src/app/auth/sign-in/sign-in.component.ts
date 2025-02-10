import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService} from "../auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: '../auth.component.scss'
})
export class SignInComponent {

  isSigningIn: boolean = false;
  signInFormGroup: FormGroup;
  router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.signInFormGroup = this.fb.group({
      email: ['katunzijr@gmail.com', [Validators.required, Validators.email]],
      password: ['Mu12345678.', Validators.required],
    });
  }

  // sleep = (delay: number | undefined) => new Promise((resolve) => setTimeout(resolve,delay))
  loginTheUser() {
    this.isSigningIn = true
    // await this.sleep(3000)
    this.authService.logInUser({
      email: this.signInFormGroup.value.email,
      password: this.signInFormGroup.value.password,
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (data): void => {
        const userData: any = data;
        this.authService.storeTokens(userData.body);
        this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
        this.isSigningIn = false
      },
      error: (error: HttpErrorResponse): void => {
        this.isSigningIn = false
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

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

}
