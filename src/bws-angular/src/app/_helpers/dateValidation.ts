import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// export function dateLessThan(to: string) {
//   return (group: FormGroup): { [key: string]: any } => {
//     let t = group.controls[to];
//     if (new Date(Date.parse(t.value)) > new Date()) {
//       return {
//         dates: 'Date should not be future date',
//       };
//     }
//     return {};
//   };
// }

export function dateLessThan(to: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const t = control.value;

    return new Date(Date.parse(t)) > new Date()
      ? { dateLessThan: { value: control.value } }
      : null;
  };
}
