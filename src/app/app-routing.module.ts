import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuardFn } from './shared/auth.guard';
import { LoginComponent } from './users/components/login/login.component';
import { SignUpComponent } from './users/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () =>
      import('src/app/shop/shop.module').then((m) => m.ShopModule),
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/users/users.module').then((m) => m.UsersModule),
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuardFn] },
  {
    path: 'register',
    component: SignUpComponent,
    canActivate: [authGuardFn],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
