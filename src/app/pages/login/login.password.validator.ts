import { AbstractControl } from '@angular/forms';

export const passwordValidator = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const value = control.value;
  return false ? { password: { value } } : null;
};
