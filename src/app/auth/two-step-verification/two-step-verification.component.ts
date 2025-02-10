import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-two-step-verification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './two-step-verification.component.html',
  styleUrl: './two-step-verification.component.scss'
})
export class TwoStepVerificationComponent {
  twoStepValificationGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.twoStepValificationGroup = this.fb.group({
      digit_1: [, [Validators.required, ]],
      digit_2: [, [Validators.required, ]],
      digit_3: [, [Validators.required, ]],
      digit_4: [, [Validators.required, ]],
    });
  }

  verifyTheUser() {
    this.authService.verifyUser({
      email: 'user@example.com',
      pin_code: `${this.twoStepValificationGroup.value.digit_1}${this.twoStepValificationGroup.value.digit_2}${this.twoStepValificationGroup.value.digit_3}${this.twoStepValificationGroup.value.digit_4}`,
    })
    // .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (data): void => {
        const userData: any = data;
        // this.authService.storeTokens(userData.body);
        // this.authService.scheduleTokenRefresh(userData.body);
        this.authService.redirectToDashbordPage();
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
