import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  get isLogged() {
    return localStorage.getItem('isLogged') === 'true';
  }

  get email() {
    return localStorage.getItem('email')!;
  }

  setLogged(email: string) {
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('email', email);
  }

  removeLogged() {
    localStorage.setItem('isLogged', 'false');
    localStorage.removeItem('email');
  }
}
