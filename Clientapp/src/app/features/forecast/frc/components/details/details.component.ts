import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrcService } from '../../services/frc.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { frcCapacityItems } from '../capacity/sampledata';
import { FrcCapacity } from '../../models/frc-capacity.model';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { FrcSalesProduct } from '../../models/frc-salesproduct.model';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'frc-details',
  templateUrl: './details.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './details.component.css',
  ],
})
export class FrcDetailsComponent implements OnInit {
  loadingOverlayVisible = this.loaderService.isLoading;
  loadingOverlayVisibleGrid = false;
  isInEditMode = false;
  company!: string;
  companyId!: number;
  plant!: string;
  year!: number;
  version!: string;
  frcId!: number;
  plantId!: number;
  costAccTypeId!: number;
  isMsgDialog = true;
  dialogType = 'danger';

  frcCapacity!: FrcCapacity[];
  showCapacity = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frcService: FrcService,
    private msgDialogService: MsgDialogService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.company = this.route.snapshot.queryParamMap.get('company')!;
    this.plant = this.route.snapshot.queryParamMap.get('plant')!;
    this.year = +this.route.snapshot.queryParamMap.get('year')!;
    this.version = this.route.snapshot.queryParamMap.get('version')!;
    this.frcId = +this.route.snapshot.queryParamMap.get('frcId')!;
    this.plantId = +this.route.snapshot.queryParamMap.get('plantId')!;
    this.companyId = +this.route.snapshot.queryParamMap.get('companyId')!;
    this.costAccTypeId =
      +this.route.snapshot.queryParamMap.get('costAccTypeId')!;

    // load the first tab (capacity)
    setTimeout(() => {
      this.frcCapacity = frcCapacityItems.filter(
        (item) => item.frcId === this.frcId
      );
      this.showCapacity = true;
    }, 1500);
  }

  goBack() {
    // check if in edit mode
    if (this.isInEditMode) {
      this.showEditModeDialog();
      return;
    }
    // go back to the frc page and load the frcs for the plant and year
    this.router.navigate(['/forecast/frc'], {
      skipLocationChange: true,
      queryParams: {
        year: this.year,
        companyId: this.companyId,
        plantId: this.plantId,
        costAccTypeId: this.costAccTypeId,
        goBack: 1,
      },
    });
  }

  showEditModeDialog() {
    this.msgDialogService.showDialog(
      'PROVK',
      'Mentetlen változások vannak. Először mentsd őket.',
      [{ text: 'Ok', primary: true }]
    );
  }

  public onSelect(e: SelectEvent) {
    this.frcCapacity = [];
  }
}
