import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { myValidator } from './validator';
import { AuthServices } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../../shared/local.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  form: FormGroup;
  editingMode: boolean = false;
  id: number = 0;
  constructor(
    FB: FormBuilder,
    private authServices: AuthServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localService: LocalService
  ) {
    this.form = FB.group(
      {
        name: FB.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
        }),
        email: [
          '',
          [Validators.required, Validators.email],
          myValidator.checkEmailAsync(
            this.authServices.checkEmailAsync.bind(this.authServices)
          ),
        ],
        address: FB.group({
          city: ['', Validators.required],
        }),
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      { validators: myValidator.passwordMatch, updateOn: 'blur' }
    );

    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editingMode = true;
      this.getOneUser();
    }
  }

  getOneUser() {
    this.authServices.getOneUser(this.id).subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  submitForm() {
    if (this.editingMode) {
      this.authServices
        .updateUser(this.form.value, this.id)
        .subscribe((user) => {
          this.editingMode = false;
          this.router.navigate(['/users']);
        });
    } else {
      this.authServices.registerUser(this.form.value).subscribe((user) => {
        this.localService.setLogged(this.form.value.email);
        location.replace('/shop');
      });
    }
  }
}
