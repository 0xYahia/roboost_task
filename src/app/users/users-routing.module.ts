import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { authGuardFn } from '../shared/auth.guard';
// import { userGuardFn } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    pathMatch: 'full',
    canActivate: [authGuardFn],
  },

  {
    path: 'edit/:id',
    component: SignUpComponent,
    pathMatch: 'full',
    canActivate: [authGuardFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
