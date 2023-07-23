import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shop/models/iProudct';
import { ProductService } from 'src/app/shop/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  editingMode: boolean = false;
  categories: string[] = [];
  id: number;
  constructor(
    FB: FormBuilder,
    private prodService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = FB.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [null],
    });
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editingMode = true;
    }
  }

  ngOnInit(): void {
    if (this.editingMode) {
      this.prodService.getOneProduct(this.id).subscribe((product) => {
        this.form.patchValue(product);
      });
    }
    this.prodService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ image: file });
  }

  submitForm() {
    if (this.editingMode) {
      this.prodService
        .updateProduct(this.form.value, this.id)
        .subscribe((product) => {
          console.log(product);
          this.router.navigate(['/shop']);
          console.log(this.form.value);
        });
    } else {
      this.prodService.addProduct(this.form.value).subscribe((product) => {
        console.log(product);
        this.router.navigate(['/shop']);
        console.log(this.form.value);
      });
    }
  }
}
