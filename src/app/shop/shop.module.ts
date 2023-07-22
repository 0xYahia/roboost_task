import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductItemsComponent } from './components/product-items/product-items.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    ProductItemsComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, ReactiveFormsModule],
})
export class ShopModule {}
