import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () =>
      import('src/app/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
