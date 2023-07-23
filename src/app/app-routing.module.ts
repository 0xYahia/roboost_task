import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';

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
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
