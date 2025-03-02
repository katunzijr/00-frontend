import { Component, inject } from '@angular/core';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '../../../auth/auth.interface';
import { AuthService } from '../../../auth/auth.service';
import { BusinessRoutes } from '../business.routes';
import { BusinessInterface } from '../business.interface';

@Component({
  selector: 'app-list-businesses',
  standalone: true,
  imports: [],
  templateUrl: './list-businesses.component.html',
  styleUrl: './list-businesses.component.scss'
})
export class ListBusinessesComponent {
 public businessRoutes = BusinessRoutes;
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);
  businessList: BusinessInterface[] = [];
  isRegisteringBusiness: boolean = false;
  private readonly router = inject(Router);

  constructor(
    private businessService: BusinessService,
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getTheBusinesses()
  }

  getTheBusinesses(){
    this.businessService.getBusinesses().subscribe({
      next: (data): void => {
        this.businessList = data
      }
    });
  }

}

