import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BusinessInterface } from './business.interface';
import { BusinessRoutes } from './business.routes';
import { BusinessService } from './business.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  public businessRoutes = BusinessRoutes;

}
