import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;

    if (!password || !confirmPassword) {
      return null; // ✅ If either field is empty, return no error
    }
    console.log(password === confirmPassword ? null : { passwordMismatch: true })

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
