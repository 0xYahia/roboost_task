import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { canActivateFn } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [canActivateFn] },
  {
    path: 'register',
    component: SignUpComponent,
    canActivate: [canActivateFn],
  },
  { path: 'edit/:id', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
