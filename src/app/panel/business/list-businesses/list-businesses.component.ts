import { Component, inject, OnInit } from '@angular/core';
import { BusinessService } from '../business.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticatedUser } from '../../../auth/auth.interface';
import { AuthService } from '../../../auth/auth.service';
import { BusinessRoutes } from '../business.routes';
import { BusinessInterface } from '../business.interface';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection, PaginationService, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { apiResultFormat, categoryList } from '../../../shared/model/page.model';
import { SidebarService } from '../../../core/service/sidebar/sidebar.service';
import { DataService } from '../../../core/service/data/data.service';
import { Sort } from '@angular/material/sort';
import { CustomPaginationModule } from '../../../shared/custom-pagination/custom-pagination.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

interface data {
  value: string;
}
@Component({
  selector: 'app-list-businesses',
  standalone: true,
  imports: [
    CustomPaginationModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './list-businesses.component.html',
  styleUrl: './list-businesses.component.scss'
})
export class ListBusinessesComponent implements OnInit{
  public businessRoutes = BusinessRoutes;
  businessList: BusinessInterface[] = [];
  public routes = BusinessRoutes;

  initChecked = false;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  // pagination variables
  public tableData: Array<categoryList> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<categoryList>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private businessService: BusinessService,
    private data: DataService,
    private pagination: PaginationService,
    private sidebar: SidebarService
  ) {

    this.data.getDataTable().subscribe((apiRes: apiResultFormat) => {
      this.totalData = apiRes.totalData;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        this.getTableData({ skip: res.skip, limit: this.totalData  });
        this.pageSize = res.pageSize;
      });
    });
  }

  ngOnInit(): void {
    var x = this.getTheBusinesses();
  }

  getTheBusinesses(){
    console.log("called")
    this.businessService.getBusinesses().subscribe({
      next: (data): void => {
        this.businessList = data.results
      }
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getCategoryList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: categoryList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<categoryList>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

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
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }
  selectedList1: data[] = [
    { value: 'Sort by Date' },
    { value: 'Newest' },
    { value: 'Oldest' },
  ];
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
  selectedList2: data[] = [
    { value: 'Choose Category' },
    { value: 'Laptop' },
    { value: 'Electronics' },
  ];
  selectedList3: data[] = [
    { value: 'Choose Status' },
    { value: 'Active' },
    { value: 'Inactive' },

  ];
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

}

