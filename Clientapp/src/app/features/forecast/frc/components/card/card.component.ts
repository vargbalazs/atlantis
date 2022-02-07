import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Frc } from '../../models/frc.model';

@Component({
  selector: 'frc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class FrcCardComponent {
  hovered = false;

  @Input() frcs!: Frc[];
  @Output() onEditFrc: EventEmitter<Frc> = new EventEmitter<Frc>();
  @Output() onDeleteFrc: EventEmitter<Frc> = new EventEmitter<Frc>();

  constructor(private router: Router) {}

  cardOverOut(item: Frc) {
    item.hovered = !item.hovered;
  }

  editFrc(provk: Frc) {
    this.onEditFrc.emit(provk);
  }

  deleteFrc(provk: Frc) {
    this.onDeleteFrc.emit(provk);
  }

  onShowFrcClick(item: Frc) {
    this.router.navigate(['/forecast/frc/details'], {
      skipLocationChange: true,
      queryParams: {
        company: item.company?.name,
        companyId: item.companyId,
        plant: item.plant?.code,
        year: item.year,
        version: item.version,
        frcId: item.id,
        plantId: item.plantId,
        costAccTypeId: item.costAccTypeId,
      },
    });
  }
}
