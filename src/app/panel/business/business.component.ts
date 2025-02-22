import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticatedUser } from '../../auth/auth.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);

  constructor(
  ) {
    this.user = this.authService.currentUser();
  }

}
