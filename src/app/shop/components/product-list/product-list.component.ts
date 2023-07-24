import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shop/models/iProudct';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  categories: string[] = [];
  selectedCategory!: string;

  constructor(private prodService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.prodService.getCategories().subscribe((categories) => {
      this.categories = ['all', ...categories];
    });
  }

  addProduct() {
    this.router.navigateByUrl('/shop/new');
  }

  getProducts() {
    this.prodService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.getProducts();
    } else {
      this.prodService.getProductsByCategory(category).subscribe((products) => {
        this.products = products;
      });
    }
  }

  editProd(event: any) {
    this.router.navigate([`/shop/edit/${event}`]);
  }

  deleteProd(event: any, deleteConfirm: HTMLDialogElement) {
    this.prodService.deleteProduct(event).subscribe((product) => {
      console.log(product);
      deleteConfirm.close();
      this.getProducts();
    });
  }
}
