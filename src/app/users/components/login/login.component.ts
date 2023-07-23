import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthServices } from '../../services/auth.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../../shared/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  username = '';
  password = '';
  constructor(
    private router: Router,
    private authServices: AuthServices,
    FB: FormBuilder,
    private localService: LocalService
  ) {
    this.form = FB.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authServices
      .loginUser(this.form.value.email, this.form.value.password)
      .subscribe((user) => {
        console.log(user);
        this.localService.setLogged(this.form.value.email);
        // this.router.navigate(['/users']);
      });
  }

  submitForm() {
    this.login();
  }
}
