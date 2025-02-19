import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BusinessInterface, BusinessTypeInterface } from './business.interface';
import { BusinessRoutes } from './business.routes';
import { BusinessService } from './business.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticatedUser } from '../../auth/auth.interface';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent implements OnInit {
  public businessRoutes = BusinessRoutes;
  registerBusinessGroup: FormGroup;
  user: AuthenticatedUser | null = null;
  authService = inject(AuthService);
  businessesTypeList: BusinessTypeInterface[] = [];
  logoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
  ) {
    this.registerBusinessGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', ],
      website: ['', ],
      isBusinessActive: [true, ],
      socialMediaLinks: ['', ],
      logo: [null, ],
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
        logo: this.registerBusinessGroup.value.logo,
        // logo: this.logoFile,
      }
    ).subscribe({
      next: (data): void => {
        console.log(data)
      },
      error: (error: HttpErrorResponse): void => {
        if (error instanceof EvalError || error.status == 0) {
          // this.toastService.showError('There is an issue with the network. Please try again.');
          console.log('There is an issue with the network. Please try again.');
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
