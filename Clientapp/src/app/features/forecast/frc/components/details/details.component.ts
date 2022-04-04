import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrcService } from '../../services/frc.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { frcCapacityItems } from '../capacity/sampledata';
import { FrcCapacity } from '../../models/frc-capacity.model';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { FrcSalesProduct } from '../../models/frc-salesproduct.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Department } from 'src/app/features/masterdata/general/department/models/department.model';
import { DepartmentService } from 'src/app/features/masterdata/general/department/services/department.service';
import { CostAccountService } from 'src/app/features/masterdata/planning/costaccount/services/costaccount.service';
import { CostCenterService } from 'src/app/features/masterdata/planning/costcenter/services/costcenter.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';

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
  costAccounts!: CostAccount[];
  costCenters!: CostCenter[];
  departments!: Department[];

  frcCapacity!: FrcCapacity[];
  showCapacity = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frcService: FrcService,
    private msgDialogService: MsgDialogService,
    private loaderService: LoaderService,
    private departmentService: DepartmentService,
    private costAccountService: CostAccountService,
    private costCenterService: CostCenterService
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

    forkJoin({
      costAccounts: this.costAccountService
        .getCostAccounts(this.companyId, this.year)
        .pipe(first()),
      costCenters: this.costCenterService
        .getCostCenters(this.plantId, this.year)
        .pipe(first()),
      departments: this.departmentService
        .getDepartments(this.plantId)
        .pipe(first()),
    }).subscribe(({ costAccounts, costCenters, departments }) => {
      this.costAccounts = costAccounts;
      this.costCenters = costCenters;
      this.departments = departments;
    });
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
