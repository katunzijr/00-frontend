import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BusinessRoutes } from '../../business.routes';
import { AuthenticatedUser } from '../../../../auth/auth.interface';
import { AuthService } from '../../../../auth/auth.service';
import { BusinessTypeInterface } from '../../business.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../../business.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-quick-add-business',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './quick-add-business.component.html',
  styleUrl: './quick-add-business.component.scss'
})
export class QuickAddBusinessComponent implements OnInit {
  public businessRoutes = BusinessRoutes;
  registerBusinessGroup: FormGroup;
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);
  businessesTypeList: BusinessTypeInterface[] = [];
  logoFile: File | null = null;
  isRegisteringBusiness: boolean = false;
  private readonly router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private toastService: ToastService,
  ) {
    this.registerBusinessGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', ],
      website: ['', ],
      isBusinessActive: [true, ],
      businessClass: ['individual', ],
      socialMediaLinks: ['', ],
      logo: [null, ],
      location: ['', ],
    });
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getTheBusinessesType()
  }

  onBusinessLogoImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
    }
  }

  getTheBusinessesType(){
    this.businessService.getBusinessesType().subscribe({
      next: (data): void => {
        this.businessesTypeList = data
      }
    });
  }

  registerTheBusiness() {
    this.isRegisteringBusiness = true
    // const formData = new FormData();
    // formData.append('name', this.registerBusinessGroup.value.name);
    // formData.append('type', this.registerBusinessGroup.value.type);
    // formData.append('description', this.registerBusinessGroup.value.description);
    // formData.append('website', this.registerBusinessGroup.value.website);
    // formData.append('is_bness_active', this.registerBusinessGroup.value.isBusinessActive);
    // formData.append('social_media_links', JSON.stringify(this.registerBusinessGroup.get('socialMediaLinks')?.value));

    // Append the image file if selected
    // const logoFile = this.registerBusinessGroup.get('logo')?.value;
    // if (logoFile) {
    //   formData.append('logo', logoFile);
    // }

    this.businessService.registerBusiness(
      {
        name: this.registerBusinessGroup.value.name,
        description: this.registerBusinessGroup.value.description,
        website: this.registerBusinessGroup.value.website,
        is_bness_active: this.registerBusinessGroup.value.isBusinessActive,
        social_media_links: this.registerBusinessGroup.value.socialMediaLinks,
        owner: Number(this.user?.pk),
        type: this.registerBusinessGroup.value.type,
        location: 'Dar es Salaam',
        // logo: this.registerBusinessGroup.value.logo,
        // logo: this.logoFile,
      }
    )
    .pipe(
      finalize(() => {
        this.isRegisteringBusiness = false;
      })
    )
    .subscribe({
      next: (data): void => {
        this.isRegisteringBusiness = false
        this.toastService.showSuccess('Business created successful.');
        this.router.navigate([BusinessRoutes.quickAddBranches]);
      },
    })
  }

}
