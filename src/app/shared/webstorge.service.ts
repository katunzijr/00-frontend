import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class WebstorgeService {

  constructor(private router: Router) {}

  public login(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate(['/']);
  }
  public submit(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate(['panel']);
  }
  public Logout(): void {
    localStorage.removeItem('authorized');
    localStorage.removeItem('loginTime');
    this.router.navigate(['/auth/signin']);
  }
}
