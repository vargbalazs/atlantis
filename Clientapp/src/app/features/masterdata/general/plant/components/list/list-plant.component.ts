import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlantService } from '../../services/plant.service';
import { plants } from './sampledata';

@Component({
  selector: 'general-plant',
  templateUrl: './list-plant.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class PlantComponent extends Crud<Plant> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    plantService: PlantService
  ) {
    super(msgDialogService, notificationService, plantService);
  }

  ngOnInit() {
    this.gridData = { data: plants, total: plants.length };
  }
}
