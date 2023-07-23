import { Component } from '@angular/core';
import { LocalService } from '../../shared/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged: boolean = false;
  email: string = '';
  constructor(private localService: LocalService, private router: Router) {
    this.isLogged = this.localService.isLogged;
    this.email = this.localService.email;
  }

  logout() {
    this.localService.removeLogged();
    location.replace('/shop');
  }
}
