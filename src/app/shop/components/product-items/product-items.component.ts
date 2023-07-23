import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shop/models/iProudct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
})
export class ProductItemsComponent {
  @Input() product!: IProduct;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() editEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() deleteConfirm!: HTMLDialogElement;

  constructor(private router: Router, private prodService: ProductService) {}

  editProd(id: number) {
    this.editEvent.emit(id);
  }

  deleteProd(id: number) {
    this.deleteEvent.emit(id);
  }
}
