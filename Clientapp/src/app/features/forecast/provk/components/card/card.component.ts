import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Provk } from '../../models/provk.model';

@Component({
  selector: 'provk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class ProvkCardComponent {
  hovered = false;

  @Input() provks!: Provk[];
  @Output() versionSelectorShow: EventEmitter<Provk> =
    new EventEmitter<Provk>();
  @Output() onEditProvk: EventEmitter<Provk> = new EventEmitter<Provk>();
  @Output() onDeleteProvk: EventEmitter<Provk> = new EventEmitter<Provk>();
  @Output() onAddNewVersion: EventEmitter<Provk> = new EventEmitter<Provk>();

  cardOverOut(item: Provk) {
    item.hovered = !item.hovered;
  }

  onShowVersionsClick(selectedProvk: Provk) {
    this.versionSelectorShow.emit(selectedProvk);
  }

  editProvk(provk: Provk) {
    this.onEditProvk.emit(provk);
  }

  deleteProvk(provk: Provk) {
    this.onDeleteProvk.emit(provk);
  }

  addNewVersion(provk: Provk) {
    this.onAddNewVersion.emit(provk);
  }
}
