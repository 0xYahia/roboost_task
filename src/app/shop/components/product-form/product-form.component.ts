import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shop/services/product.service';
import { IProduct } from '../../models/iProudct';

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
      image: [null, Validators.required],
    });
    //! Check if we are in editing mode
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
    let chosenEvent!: Observable<IProduct>;
    if (this.editingMode) {
      chosenEvent = this.prodService.updateProduct(this.form.value, this.id);
    } else {
      chosenEvent = this.prodService.addProduct(this.form.value);
    }
    chosenEvent.subscribe((product) => {
      console.log(product);
      this.router.navigate(['/shop']);
    });
  }
}
