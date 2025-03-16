import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalData!: number;  // Total records
  @Input() limit = 10;  // Items per page
  @Input() currentPage = 1;  // Current page
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalData / this.limit);
  }

  get pageNumberArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  moveToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
