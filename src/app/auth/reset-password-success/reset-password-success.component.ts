import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRoutes } from '../auth.routes';

@Component({
  selector: 'app-reset-password-success',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './reset-password-success.component.html',
  styleUrl: './reset-password-success.component.scss'
})
export class ResetPasswordSuccessComponent {
  public readonly routes = AuthRoutes;

}
