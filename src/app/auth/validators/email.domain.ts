import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailDomainValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toLowerCase()
  const hosts = [
    {to_whom: 'staff', host: 'gmail.com'},
    {to_whom: 'staff', host:'yahoo.com'},
  ]

  if(!value) {
    // console.log('null found')
    return null
  }

  const matches = hosts.some(host => value.endsWith('@' + host.host));
  // console.log(matches)
  return matches ? { emaildomainvalidator: true } : null;
}
