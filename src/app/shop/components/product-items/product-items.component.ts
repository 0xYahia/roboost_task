import { Component, Input } from '@angular/core';
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

  constructor(private router: Router, private prodService: ProductService) {}

  editProd(id: number) {
    this.router.navigate([`/shop/edit/${id}`]);
  }

  deleteProd(id: number, deleteConfirm: HTMLDialogElement) {
    this.prodService.deleteProduct(id).subscribe((product) => {
      console.log(product);
      deleteConfirm.close();
      //! Not recommended
      location.reload();
    });
  }
}
