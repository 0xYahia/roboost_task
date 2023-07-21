import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  editingMode: boolean = false;
  categories: string[] = [];
  constructor(FB: FormBuilder, private productService: ProductService) {
    this.form = FB.group({
      title: ['', Validators.required, Validators.maxLength(50)],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.productService.editingSubject.subscribe((product) => {
      this.editingMode = true;
      this.form.patchValue(product);
    });
  }
}
