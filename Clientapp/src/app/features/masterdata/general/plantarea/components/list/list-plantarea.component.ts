import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PlantArea } from 'src/app/features/masterdata/general/plantarea/models/plantarea.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlantAreaService } from '../../services/plantarea.service';
import { plantareas } from './sampledata';

@Component({
  selector: 'general-plantarea',
  templateUrl: './list-plantarea.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class PlantAreaComponent extends Crud<PlantArea> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    plantAreaService: PlantAreaService
  ) {
    super(msgDialogService, notificationService, plantAreaService);
  }

  ngOnInit() {
    this.gridData = { data: plantareas, total: plantareas.length };
  }
}
