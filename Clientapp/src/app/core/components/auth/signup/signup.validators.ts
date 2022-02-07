import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export class SignupValidation {
  /**
   * checks whether the values of the two controls are the same
   *
   * @static
   * @param {string} controlName
   * @param {string} checkControlName
   * @return {*}  {ValidatorFn}
   * @memberof SignupValidation
   */
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.notMatching) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        return { notMatching: true };
      } else {
        return null;
      }
    };
  }

  /**
   * checks if the email is already in use (later the setTimeout has to be changed to an API call)
   *
   * @static
   * @param {AbstractControl} control
   * @return {*}  {(Promise<any> | Observable<any>)}
   * @memberof SignupValidation
   */
  static checkEmail(control: AbstractControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsAlreadyInUse: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
