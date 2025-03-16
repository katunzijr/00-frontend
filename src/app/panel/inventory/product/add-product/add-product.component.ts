import { productList } from './../../../../shared/model/page.model';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../core/service/sidebar/sidebar.service';
import { InventoryRoutes } from '../../inventory.routes';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../inventory.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { LocalBusinessInterface } from '../../../business/business.interface';
import { BusinessService } from '../../../business/business.service';
import { finalize } from 'rxjs';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    RouterLink,
    MatSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  isProductVisible: boolean = true;
  isProductVisible1: boolean = true;
  public routes = InventoryRoutes

  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public selectedValue9 = '';
  public selectedValue10 = '';
  public selectedValue11 = '';

  selectedList1: data[] = [
    { value: 'Choose' },
    { value: 'Thomas' },
    { value: 'Rasmussen' },
    { value: 'Fred john' },
  ];
  selectedList2: data[] = [
    { value: 'Choose' },
    { value: 'Legendary' },
    { value: 'Determined' },
    { value: 'Sincere' },
  ];
  selectedList3: data[] = [
    { value: 'Choose' },
    { value: 'Lenovo' },
    { value: 'Electronics' },
  ];
  selectedList4: data[] = [
    { value: 'Choose' },
    { value: 'Lenovo' },
    { value: 'Electronics' },
  ];
  selectedList5: data[] = [
    { value: 'Choose' },
    { value: 'Fruits' },
    { value: 'Computers' },
    { value: 'Shoes' },
  ];
  selectedList6: data[] = [
    { value: 'Choose' },
    { value: 'Nike' },
    { value: 'Bolt' },
  ];
  selectedList7: data[] = [
    { value: 'Choose' },
    { value: 'Kg' },
    { value: 'Pc' },
  ];
  selectedList8: data[] = [{ value: 'Exclusive' }, { value: 'Sales Tax' }];
  selectedList9: data[] = [
    { value: 'Choose' },
    { value: 'Percentage' },
    { value: 'Cash' },
  ];
  selectedList10: data[] = [
    { value: 'Choose' },
    { value: 'Percentage' },
    { value: 'Cash' },
  ];
  selectedList11: data[] = [
    { value: 'Choose' },
    { value: 'Code34' },
    { value: 'Code35' },
    { value: 'Code36' },
  ];
  selectedList12: data[] = [
    { value: 'Choose' },
    { value: 'Code34' },
    { value: 'Code35' },
    { value: 'Code36' },
  ];

  isCollapsed: boolean = false;
  addProductFormGroup: FormGroup;
  isAddingProduct: boolean = false;
  continueAdding = false;
  private readonly router = inject(Router);
  businessService = inject(BusinessService);
  currentBusiness: LocalBusinessInterface | null = null;

  constructor(
    private sidebar: SidebarService,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastService: ToastService,
  ) {
    this.addProductFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
    });
    this.currentBusiness = this.businessService.loadCurrentBusinessLocally();
  }

  setContinueAdding(value: boolean) {
    this.continueAdding = value;
  }

  addTheProduct() {
    this.isAddingProduct = true

    this.inventoryService.addProduct({
        name: this.addProductFormGroup.value.name,
        description: this.addProductFormGroup.value.description,
        business: Number(this.currentBusiness?.id),
    }).pipe(
      finalize(() => {
        this.isAddingProduct = false;
      })
    ).subscribe({
      next: (data): void => {
        this.toastService.showSuccess('Product added successful.');
        if (this.continueAdding) {
          this.router.navigate([InventoryRoutes.addProduct]);
          this.addProductFormGroup.reset();
        }
        else {
          this.router.navigate([InventoryRoutes.listProducts]);
          this.continueAdding = false;
        }
      },
    })
  }

  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  public image: boolean[] = [true, true, true];

  public removeImg(index: number) {
    this.image[index] = !this.image[index];
  }
}
