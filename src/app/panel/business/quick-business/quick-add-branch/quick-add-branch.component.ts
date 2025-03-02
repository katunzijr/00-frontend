import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticatedUser } from '../../../../auth/auth.interface';
import { AuthService } from '../../../../auth/auth.service';
import { BusinessRoutes } from '../../business.routes';
import { BusinessService } from '../../business.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardRoutes } from '../../../dashboard/dashboard.routes';
import { LocalBusinessInterface } from '../../business.interface';

@Component({
  selector: 'app-quick-add-branches',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './quick-add-branch.component.html',
  styleUrl: './quick-add-branch.component.scss'
})
export class QuickAddBranchesComponent {
  registerBranchGroup: FormGroup;
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);
  private readonly router = inject(Router);
  logoFile: File | null = null;
  isRegisteringBranch: boolean = false;
  currentBusiness: LocalBusinessInterface | null = null;

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private toastService: ToastService,
  ) {
    this.registerBranchGroup = this.fb.group({
      tag: ['Main branch', Validators.required],
      contactEmail: ['', ],
      contactLine1: ['', ],
      contactLine2: ['', ],
      fax: ['+255', ],
      city: ['Dar es Salaam', ],
      country: ['Tanzania', ],
      stateProvince: ['Tanzania', ],
      zipOrPostalCode: ['', ],
      location: ['', Validators.required],
      isBranchActive: [true, ],
    });
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.currentBusiness = this.businessService.loadCurrentBusinessLocally();
  }


  registerTheBranch() {
    this.isRegisteringBranch = true

    this.businessService.registerBranches(
      {
        tag: this.registerBranchGroup.value.tag,
        contact_email: this.registerBranchGroup.value.contactEmail,
        contact_line1: this.registerBranchGroup.value.contactLine1,
        contact_line2: this.registerBranchGroup.value.contactLine2,
        fax: this.registerBranchGroup.value.fax,
        city: this.registerBranchGroup.value.city,
        country: this.registerBranchGroup.value.country,
        state_province: this.registerBranchGroup.value.stateProvince,
        zip_postal_code: this.registerBranchGroup.value.zipOrPostalCode,
        location: this.registerBranchGroup.value.location,
        is_branch_active: this.registerBranchGroup.value.isBranchActive,
        business: this.currentBusiness?.id,
      }
    ).subscribe({
      next: (data): void => {
        this.isRegisteringBranch = false
        console.log(data)
        this.toastService.showSuccess('Branch created successful.');
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse): void => {
        this.isRegisteringBranch = false
        if (error instanceof EvalError || error.status == 0) {
          this.toastService.showError('There is an issue with the network. Please try again.');
        }
        else if (error.status == 403) {
          console.log(error.error.detail);
        }
        else if (error.status == 400) {
          if (error.error.username) {
            error.error.username.forEach((item: string) => {console.log(item)})
          }
          else if (error.error.email) {
            error.error.email.forEach((item: string) => {console.log(item)})
          }
          else if (error.error.non_field_errors) {
            error.error.non_field_errors.forEach((item: string) => {console.log(item)})
          }
        }
        // console.log(error)
      }
    })
  }

}
