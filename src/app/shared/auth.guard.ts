import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LocalService } from './local.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private authService: LocalService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isLogged) {
      if (state.url != '/login' && state.url != '/register') {
        return true;
      }
      alert('You are already logged in');
      this.router.navigate(['/shop']);
      return false;
    } else {
      if (state.url != '/login' && state.url != '/register') {
        alert('You must be logged in to access this page');
        this.router.navigate(['/shop']);
      }
      return true;
    }
  }

  canActivateProfile(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.isLogged) {
      this.router.navigate(['/shop']);
      return false;
    } else {
      return true;
    }
  }
}

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate(route, state);
};
