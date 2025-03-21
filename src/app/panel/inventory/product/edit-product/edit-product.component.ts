import { Component } from '@angular/core';
import { InventoryRoutes } from '../../inventory.routes';
import { SidebarService } from '../../../../core/service/sidebar/sidebar.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../inventory.interface';
import { InventoryService } from '../../inventory.service';

interface data {
  value: string;
}
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    RouterLink,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  public routes = InventoryRoutes
  productData: ProductInterface | null = null;

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
  public selectedValue12 = '';
  public selectedValue13 = '';
  public selectedValue14 = '';
  public selectedValue15 = '';
  public selectedValue16 = '';
  public selectedValue17 = '';
  public image: boolean[] = [true, true, true];

  selectedList1: data[] = [
    { value: 'Thomas' },
    { value: 'Rasmussen' },
    { value: 'Fred john' },
  ];
  selectedList2: data[] = [
    { value: 'Legendary' },
    { value: 'Determined' },
    { value: 'Sincere' },
  ];
  selectedList3: data[] = [{ value: 'Lenovo' }, { value: 'Electronics' }];
  selectedList4: data[] = [{ value: 'Lenovo' }, { value: 'Electronics' }];
  selectedList5: data[] = [
    { value: 'Fruits' },
    { value: 'Computers' },
    { value: 'Shoes' },
  ];
  selectedList6: data[] = [{ value: 'Nike' }, { value: 'Bolt' }];
  selectedList7: data[] = [{ value: 'Kg' }, { value: 'Pc' }];
  selectedList8: data[] = [
    { value: 'Transactional selling' },
    { value: 'Solution selling' },
  ];
  selectedList9: data[] = [
    { value: 'Code34' },
    { value: 'Code35' },
    { value: 'Code36' },
  ];
  selectedList10: data[] = [{ value: 'Exclusive' }, { value: 'Sales Tax' }];
  selectedList11: data[] = [{ value: 'Percentage' }, { value: 'Cash' }];
  selectedList12: data[] = [
    { value: 'Choose' },
    { value: 'Color' },
    { value: 'Red' },
    { value: 'Black' },
  ];
  selectedList13: data[] = [{ value: 'Percentage' }, { value: 'Cash' }];
  selectedList14: data[] = [{ value: 'Choose' }, { value: 'Code34' }];
  selectedList15: data[] = [
    { value: 'Choose' },
    { value: 'Direct' },
    { value: 'Indirect' },
  ];
  selectedList16: data[] = [
    { value: 'Choose' },
    { value: 'Income Tax' },
    { value: 'Service Tax' },
  ];
  selectedList17: data[] = [
    { value: 'Choose' },
    { value: 'Percentage' },
    { value: 'Early Payment' },
  ];

  constructor(
      private sidebar: SidebarService,
      private inventoryService: InventoryService,
      private route: ActivatedRoute
    ) { }

    ngOnInit() {
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      this.viewTheProduct(productId);
    }

    viewTheProduct(productId: number) {
      this.inventoryService.getProduct(productId).subscribe({
        next: (data: ProductInterface ): void => {
          this.productData = data
        }
      });
    }

  public removeImg(index: number) {
    this.image[index] = !this.image[index];
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
}
