import { Injectable } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * toggles the password in the given textbox
   *
   * @param {TextBoxComponent} textBox
   * @return {*}
   * @memberof AuthService
   */
  togglePass(textBox: TextBoxComponent) {
    const inputEl = textBox.input.nativeElement;

    if (inputEl.type === 'password') {
      inputEl.type = 'text';
    } else {
      inputEl.type = 'password';
    }
  }
}
