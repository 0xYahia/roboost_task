import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../local.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  location: any = Location;
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
