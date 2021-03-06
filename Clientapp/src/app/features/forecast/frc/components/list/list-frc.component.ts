import { Component, OnInit } from '@angular/core';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Frc } from '../../models/frc.model';
import { FrcService } from '../../services/frc.service';
import { MsgDialogService } from '../../../../../shared/services/msgdialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from 'src/app/shared/classes/crud.class';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'list-frc',
  templateUrl: './list-frc.component.html',
  styleUrls: ['../../../../../styles/routed-component.css'],
})
export class FrcComponent extends Crud<Frc> implements OnInit {
  filterEntity!: FilterEntity;
  frcs!: Frc[];
  listWasFiltered = false;
  companyId!: number;
  company!: Company;
  plantId!: number;
  plant!: Plant;
  costAccTypeId!: number;
  costAccType!: CostAccountingType;
  year!: number;
  goBack!: number;

  constructor(
    private frcService: FrcService,
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    loaderService: LoaderService,
    translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(
      msgDialogService,
      notificationService,
      frcService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.goBack = +this.route.snapshot.queryParamMap.get('goBack')!;
    if (this.goBack === 1) {
      this.companyId = +this.route.snapshot.queryParamMap.get('companyId')!;
      this.plantId = +this.route.snapshot.queryParamMap.get('plantId')!;
      this.costAccTypeId =
        +this.route.snapshot.queryParamMap.get('costAccTypeId')!;
      this.year = +this.route.snapshot.queryParamMap.get('year')!;
      this.filterFrcs(
        this.companyId,
        this.plantId,
        this.year,
        this.costAccTypeId
      );
    }
  }

  showFilterForm() {
    this.filterEntity = new FilterEntity();
  }

  cancelFilterForm() {
    this.filterEntity = undefined!;
  }

  saveFilterForm(filterEntity: FilterEntity) {
    this.filterEntity = undefined!;
    this.filterFrcs(
      filterEntity.companyId!,
      filterEntity.plantId!,
      filterEntity.year?.getFullYear()!,
      filterEntity.costAccTypeId!
    );
    this.company = filterEntity.company!;
    this.plant = filterEntity.plant!;
    this.costAccType = filterEntity.costAccType!;
  }

  filterFrcs(
    companyId: number,
    plantId: number,
    year: number,
    costAccTypeId: number
  ) {
    this.frcService
      .getFrcs(companyId!, plantId!, year!, costAccTypeId!)
      .subscribe((result) => {
        this.frcs = result;
        this.gridData = { data: this.frcs, total: this.frcs.length };
        this.listWasFiltered = true;
        this.year = year!;
        this.company = this.frcs[0].company!;
        this.plant = this.frcs[0].plant!;
        this.costAccType = this.frcs[0].costAccType!;
      });
  }
}
