import { Component, inject } from '@angular/core';
import { AuthenticatedUser } from '../../../auth/auth.interface';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quick-business',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './quick-business.component.html',
  styleUrl: './quick-business.component.scss'
})
export class QuickBusinessComponent {
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);

  constructor(
  ) {
    this.user = this.authService.currentUser();
  }
}
