import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiResultFormat } from '../../../shared/model/page.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getCountryList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/countrys.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseCategory(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/expense-category.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExpenseList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/expense-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCustomerList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/customerList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getQuotationList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/quotation-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransferList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/transferList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getUserList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/userList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }


  public getProductList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/product-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCategoryList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/category-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSubcategoryList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/subcategoryList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBrandList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/brand-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getPurchaseList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/purchase-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSalesReturnList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/salesreturnLists.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPurchaseReturnList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/purchaseReturnList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSupplierList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/supplierList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPeopleUserList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/peopleUserList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getStateList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/stateList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseOrderReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/purchase-order-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPurchaseReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/purchase-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPaymentSettings(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/paymentSettings.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCurrencySettings(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/currency-setting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getGroupPermission(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/groupPermission.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxRates(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/taxRates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierReport1(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/supplierReport1.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSupplierReport2(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/supplierReport2.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSupplierReport3(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/supplierReport3.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSalesListModal(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/salesListModal.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPos1(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/pos1.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPos2(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/pos2.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPos3(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/pos3.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEditPermission(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/editpermisssion.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getEvents() {
    return this.http.get('/JSON/scheduleevents.json').pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getDataTable() {
    return this.http.get<apiResultFormat>('/JSON/datatables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeleteAccount(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/delete-account.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCoupons(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/coupons.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDesignation(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/designation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDepartment(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/department-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAttendanceAdmin(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/attendance-admin.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAttendanceEmployee(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/attendance-employee.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBarcode(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/barcode.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpiredproduct(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/expired-products.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getEmployeeList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/employee-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCustomfield(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/custom-field.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBankSettingsList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/bank-settings-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHolidays(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/holidays.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLanguageSetting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/language-setting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpiredProduct(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/expired-product.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUnit(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/units.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFileShared(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/file-shared.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountry(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/coutries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getRolesPermissions(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/roles-permissions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getState(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/state.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCustomer(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/customers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPrinterSetting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/printer-setting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSalesList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/sales-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getShift(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/shift.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLowStocks(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/low-stocks.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLowStocks2(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/low-stocks.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getManageStocks(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/manage-stocks.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getWarranty(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/warranty.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPayrollList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/payroll-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/sales-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReturn(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/sales-return.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getVarriantAttributes(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/varriant-attributes.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStocks(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/stock-transfer.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStockadjustment(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/stock-adjustment.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
}
  public getUsers(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/users.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getQrCode(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/qrcode.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeavesAdmin(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/leaves-admin.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeavesType(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/leaves-type.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeavesEmployee(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/leaves-employee.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStoreList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/store-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSubCategories(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/sub-categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplier(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/suppliers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getWareHouse(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/warehouse.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseReturns(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/purchase-returns.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxRate(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/tax-rates.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInventoryReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/inventory-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/invoice-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getexpenseReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/expense-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCustomerReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/customer-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getIncomeReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/income-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/supplier-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSupplierpaymentReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/payment-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSupplierReturnReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/return-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPermission(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/permission.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxReport1(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/tax-reports1.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxReport2(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('/JSON/tax-reports2.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPosPurchase(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('/JSON/pos-purchase.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
}
