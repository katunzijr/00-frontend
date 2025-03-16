import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { UnitsComponent } from './units/units.component';
import { VarriantAttributesComponent } from './varriant-attributes/varriant-attributes.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { LowStocksComponent } from './stock/low-stocks/low-stocks.component';
import { StockComponent } from './stock/stock.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ExpiredProductsComponent } from './product/expired-products/expired-products.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoriesComponent } from './category/sub-categories/sub-categories.component';

export class InventoryRoutes {
  private static base = '';

  public static get inventory(): string {
    return this.base + 'inventory';
  }

  public static get barcode(): string {
    return this.inventory + '/barcode';
  }
  public static get brandList(): string {
    return this.inventory + '/brand-list';
  }
  public static get warranty(): string {
    return this.inventory + '/warranty';
  }
  public static get units(): string {
    return this.inventory + '/units';
  }
  public static get varriantAttributes(): string {
    return this.inventory + '/varriant-attributes';
  }
  public static get qrcode(): string {
    return this.inventory + '/qrcode';
  }

  public static get category(): string {
    return this.inventory + '/category';
  }
  public static get subCategories(): string {
    return this.category + '/sub-categories';
  }
  public static get categoryList(): string {
    return this.category + '/category-list';
  }

  public static get stock(): string {
    return this.inventory + '/stock';
  }
  public static get lowStock(): string {
    return this.stock + '/low-stock';
  }

  public static get product(): string {
    return this.inventory + '/product';
  }
  public static get editProduct(): string {
    return this.product + '/edit-product';
  }
  public static get listProducts(): string {
    return this.product + '/list-products';
  }
  public static get addProduct(): string {
    return this.product + '/add-product';
  }
  public static get expiredProducts(): string {
    return this.product + '/expired-products';
  }
  public static get viewProduct(): string {
    return this.product + '/view-product';
  }
}

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: InventoryRoutes.barcode, component: BarcodeComponent },
      { path: InventoryRoutes.brandList, component: BrandListComponent },
      { path: InventoryRoutes.warranty, component: WarrantyComponent },
      { path: InventoryRoutes.units, component: UnitsComponent, },
      { path: InventoryRoutes.varriantAttributes, component: VarriantAttributesComponent, },
      { path: InventoryRoutes.qrcode, component: QrcodeComponent, },
      {
        path: '',
        component: CategoryComponent,
        children: [
          { path: InventoryRoutes.category, pathMatch: 'full', redirectTo: InventoryRoutes.categoryList },
          { path: InventoryRoutes.categoryList, component: CategoryListComponent, },
          { path: InventoryRoutes.subCategories, component: SubCategoriesComponent, },
        ]
      },
      {
        path: '',
        component: StockComponent,
        children: [
          { path: InventoryRoutes.stock, pathMatch: 'full', redirectTo: InventoryRoutes.lowStock },
          { path: InventoryRoutes.lowStock, component: LowStocksComponent, },
        ]
      },
      {
        path: '',
        component: ProductComponent,
        children: [
          { path: InventoryRoutes.product, pathMatch: 'full', redirectTo: InventoryRoutes.listProducts },
          { path: InventoryRoutes.listProducts, component: ListProductsComponent, },
          { path: InventoryRoutes.editProduct+'/:id', component: EditProductComponent, },
          { path: InventoryRoutes.addProduct, component: AddProductComponent, },
          { path: InventoryRoutes.expiredProducts, component: ExpiredProductsComponent, },
          { path: InventoryRoutes.viewProduct+'/:id', component: ViewProductComponent, },
        ],
      }
    ],
  },
];





