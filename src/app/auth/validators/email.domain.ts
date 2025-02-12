import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Create a custom email domain validator
export function emailDomainValidator(excludedHosts: { host: string }[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null; // Don't validate empty values
    }

    // Extract domain from the email
    const domain = email.split('@')[1];

    // Check if the domain is in the hosts list
    const validDomain = excludedHosts.some(host => host.host === domain);

    return validDomain ? { invalidDomain: { value: control.value } } : null;
  };
}

