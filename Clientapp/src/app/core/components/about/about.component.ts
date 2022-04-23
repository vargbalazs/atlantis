import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  @Output('closeAbout') closeAbout = new EventEmitter();

  closeForm() {
    this.closeAbout.emit();
  }
}
