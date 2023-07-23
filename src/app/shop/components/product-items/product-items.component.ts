import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/shop/models/iProudct';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
})
export class ProductItemsComponent {
  @Input() product!: IProduct;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() editEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  editProd(id: number) {
    this.editEvent.emit(id);
  }

  deleteProd(id: number) {
    this.deleteEvent.emit(id);
  }
}
