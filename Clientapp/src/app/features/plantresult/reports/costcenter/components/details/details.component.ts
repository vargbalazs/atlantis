import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { IReportMonth } from 'src/app/shared/interfaces/reportmonth.interface';
import { IReportSum } from 'src/app/shared/interfaces/reportsum.interface';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ReportService } from 'src/app/shared/services/report.service';
import { CostCenterReportService } from '../../services/costcenter-report.service';

@Component({
  selector: 'cc-details',
  templateUrl: './details.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostCenterDetailsComponent implements OnInit {
  gridData!: GridDataResult;
  loadingOverlayVisible = this.loaderService.isLoading;
  reportMonths: IReportMonth = { actMonth: '', cumMonth: '' };
  sums: IReportSum = {
    sumBudget: 0,
    sumActual: 0,
    sumMonthDiff: 0,
    sumCumBudget: 0,
    sumCumActual: 0,
    sumCumDiff: 0,
    sumFrc: 0,
    sumCumFrc: 0,
    sumMonthFrcDiff: 0,
    sumCumFrcDiff: 0,
  };
  state: any;
  navItems: BreadCrumbItem[] = [
    {
      text: this.translateService.instant('breadCrumb.overview'),
    },
    {
      text: '',
    },
  ];
  costCenter!: CostCenter;
  filterEntity!: FilterEntity;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private loaderService: LoaderService,
    private costCenterReportService: CostCenterReportService,
    private translateService: TranslateService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.costCenter = <CostCenter>this.state.costCenter;
    this.filterEntity = <FilterEntity>this.state.filterEntity;
    this.navItems[1].text = this.costCenter.code;
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.reportMonths = this.reportService.setMonthHeader(this.filterEntity);
    this.costCenterReportService
      .getCostCenterDetails(
        this.filterEntity.year?.getFullYear()!,
        this.filterEntity.year?.getMonth()! + 1,
        this.costCenter.id!,
        this.filterEntity.costAccTypeId!,
        this.filterEntity.plantId!,
        this.filterEntity.companyId!
      )
      .subscribe((details) => {
        this.gridData = { data: details, total: details.length };
        this.sums = this.reportService.calculateSums(details);
      });
  }

  onNavItemClick(item: BreadCrumbItem): void {
    this.router.navigate(['/plantresult/costcenter'], {
      skipLocationChange: true,
      state: this.state,
    });
  }
}
