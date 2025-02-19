import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lock-screen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss'
})
export class LockScreenComponent {
  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }

  lockScreenGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private toastService: ToastService,
  ) {
    this.lockScreenGroup = this.fb.group({
      password: ['', Validators.required],
    });
  }

  lockTheUserScreen() {
    console.log("Do nothing!")
  }

}
