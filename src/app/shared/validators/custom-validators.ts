import { AbstractControl } from '@angular/forms';
import { AppConstants } from '../constants/app.constants';
// import { AppConstant } from './../constants/app.constant';

export class CustomValidators {
  static emailValidator(control: AbstractControl) {
    if (
      control.value &&
      (control.value.length === 0 ||
        control.value.match(AppConstants.EMAIL_PATTERN))
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static phoneValidator(control: AbstractControl) {
    if (
      control.value &&
      (control.value.length === 0 ||
        control.value.match(AppConstants.PHONE_PATTERN))
    ) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }

  static urlValidator(control: AbstractControl) {
    if (
      control.value &&
      (control.value.length === 0 ||
        control.value.match(AppConstants.URL_PATTERN))
    ) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }
}
