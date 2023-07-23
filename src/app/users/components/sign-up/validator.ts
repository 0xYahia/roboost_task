import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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
}
