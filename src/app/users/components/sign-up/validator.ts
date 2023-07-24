import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';

export class myValidator {
  static passwordMatch: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    formGroup = formGroup as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMatch: true };
    } else {
      return null;
    }
  };

  static checkEmailAsync(
    emailChecker: (email: string) => Observable<ValidationErrors | null>
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return emailChecker(control.value);
    };
  }
}
