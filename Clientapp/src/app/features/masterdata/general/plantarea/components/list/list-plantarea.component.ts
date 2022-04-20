import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PlantArea } from 'src/app/features/masterdata/general/plantarea/models/plantarea.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlantAreaService } from '../../services/plantarea.service';

@Component({
  selector: 'general-plantarea',
  templateUrl: './list-plantarea.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class PlantAreaComponent extends Crud<PlantArea> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private plantAreaService: PlantAreaService,
    loaderService: LoaderService
  ) {
    super(
      msgDialogService,
      notificationService,
      plantAreaService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.plantAreaService.getPlantAreas().subscribe((plantAreas) => {
      this.gridData = { data: plantAreas, total: plantAreas.length };
    });
  }
}
