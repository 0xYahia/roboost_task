import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.form = FB.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      },
      { updateOn: 'blur' }
    );
  }

  login() {
    this.authServices
      .loginUser(this.form.value.email, this.form.value.password)
      .subscribe((user) => {
        if (user.length > 0) {
          this.localService.setLogged(this.form.value.email);
          location.replace('/shop');
        } else {
          alert('Wrong email or password');
        }
      });
  }

  submitForm() {
    this.login();
  }
}
