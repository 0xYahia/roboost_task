import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { authGuardFn } from '../shared/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'new', component: ProductFormComponent, canActivate: [authGuardFn] },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    canActivate: [authGuardFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
