import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { InventoryService } from '../../inventory.service';
import { ProductInterface } from '../../inventory.interface';
import { CommonModule } from '@angular/common';
import JsBarcode from 'jsbarcode';


@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,

  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  productData: ProductInterface | null = null;
  @ViewChild('barcode', { static: true }) barcodeElement!: ElementRef;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.viewTheProduct(productId);
  }

  generateBarcode() {
    if (this.productData?.bar_code) {
      JsBarcode(this.barcodeElement.nativeElement, this.productData.bar_code, {
        format: 'CODE128',
        displayValue: true
      });
    }
  }

  viewTheProduct(productId: number) {
    this.inventoryService.getProduct(productId).subscribe({
      next: (data: ProductInterface ): void => {
        this.productData = data;
        this.generateBarcode();
      }
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
    },
    nav: true,
  };
}
