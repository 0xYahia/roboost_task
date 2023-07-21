import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/iProudct';
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
  newProd: IProduct = {} as IProduct;
  constructor(
    FB: FormBuilder,
    private prodService: ProductService,
    private router: Router
  ) {
    this.form = FB.group({
      title: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.prodService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.prodService.editingSubject.subscribe((product) => {
      this.editingMode = true;
      this.form.patchValue(product);
    });
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    this.form.get('image')?.setValue(file);
  }

  submitForm() {
    const observer = {
      next: () => {
        alert('Add product successfully');
        this.router.navigateByUrl('/shop');
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };
    this.prodService.addProduct(this.newProd).subscribe(observer);
  }
}
