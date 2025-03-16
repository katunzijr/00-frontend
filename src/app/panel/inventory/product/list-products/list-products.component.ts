import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { InventoryRoutes } from '../../inventory.routes';
import { apiResultFormat, productList } from '../../../../shared/model/page.model';
import { DataService } from '../../../../core/service/data/data.service';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { SidebarService } from '../../../../core/service/sidebar/sidebar.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CustomPaginationModule } from '../../../../shared/custom-pagination/custom-pagination.module';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../inventory.service';
import { ProductInterface } from '../../inventory.interface';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    RouterLink,
    CustomPaginationModule,
    CommonModule,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  initChecked = false;
  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  selectedValue4 = '';
  selectedValue5 = '';
  selectedValue6 = '';
  selectedValue7 = '';
  selectedValue8 = '';
  selectedValue9 = '';
  selectedValue10 = '';
  selectedValue11 = '';
  selectedValue12 = '';
  selectedValue13 = '';
  selectedValue14 = '';
  selectedValue15 = '';
  selectedValue16 = '';
  selectedValue17 = '';
  selectedValue18 = '';
  selectedValue19 = '';
  selectedValue20 = '';
  selectedValue21 = '';
  selectedValue22 = '';
  selectedValue23 = '';
  selectedValue24 = '';
  selectedValue25 = '';
  selectedValue26 = '';
  public productList: any;


  public routes = InventoryRoutes;
  productListy: ProductInterface[] = [];
  isDeletingProduct: boolean = false;

  // pagination variables
  public tableData: Array<ProductInterface> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];

  showFilter = false;
  dataSource!: MatTableDataSource<ProductInterface>;
  public searchDataValue = '';
  //** / pagination variables


  constructor(
    private pagination: PaginationService,
    private sidebar: SidebarService,
    private inventoryService: InventoryService,
  ) {
    this.getTheProducts();
  }

  getTheProducts(){
    this.inventoryService.getProducts().subscribe({
      next: (data): void => {
        this.productListy = data.results
        this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          // this.getTableData({ skip: res.skip, limit: data.count });
          this.pageSize = res.pageSize;
        });
      }
    });
  }

  // private getTableData(pageOption: pageSelection): void {
  //   this.inventoryService.getProducts().subscribe((apiRes: any) => {
  //     this.tableData = [];
  //     this.serialNumberArray = [];
  //     this.productListy = apiRes.totalData;
  //     apiRes.data.map((res: ProductInterface, index: number) => {
  //       const serialNumber = index + 1;
  //       if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
  //         res.id = serialNumber;
  //         this.tableData.push(res);
  //         this.serialNumberArray.push(serialNumber);
  //       }
  //     });
  //     this.dataSource = new MatTableDataSource<ProductInterface>(this.tableData);
  //     this.pagination.calculatePageSize.next({
  //       totalData: apiRes.data,
  //       pageSize: this.pageSize,
  //       tableData: this.tableData,
  //       serialNumberArray: this.serialNumberArray,
  //     });
  //   });
  // }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {

  }

  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }

  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }

  deleteTheProduct(productId: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete product ❗️',
      text: "You won't be able to revert this!",
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeletingProduct = true;
        this.inventoryService.deleteProduct(productId).subscribe({
          next: () => {
            this.isDeletingProduct = false;
            const index = this.productListy.findIndex((barcode: { id: number; }) => barcode.id === productId);
            if (index !== -1) {
              this.productListy.splice(index, 1);
            }
            swalWithBootstrapButtons.fire(
              'Product Deleted!',
              'Product has been deleted. 🚮',
              'success'
            )
          },
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled.',
          'The product is safe 😇',
          'info'
        )
      }
    })
  }

  selectAll(initChecked: boolean) {
    // if (!initChecked) {
    //   this.tableData.forEach((f) => {
    //     f.isSelected = true;
    //   });
    // } else {
    //   this.tableData.forEach((f) => {
    //     f.isSelected = false;
    //   });
    // }
  }

}
