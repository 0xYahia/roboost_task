import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/iProudct';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private prodService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.prodService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  addProduct() {
    this.router.navigateByUrl('/shop/new');
  }
}
