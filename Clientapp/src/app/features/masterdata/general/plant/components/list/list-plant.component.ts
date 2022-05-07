import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'general-plant',
  templateUrl: './list-plant.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class PlantComponent extends Crud<Plant> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private plantService: PlantService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      plantService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.plantService.getPlants().subscribe((plants) => {
      this.gridData = { data: plants, total: plants.length };
    });
  }
}
