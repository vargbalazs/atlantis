import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IReportMonth } from 'src/app/shared/interfaces/reportmonth.interface';
import { IReportSum } from 'src/app/shared/interfaces/reportsum.interface';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ReportService } from 'src/app/shared/services/report.service';
import { CostCenterReportService } from '../../services/costcenter-report.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostCenterOverviewComponent implements OnInit {
  filterEntity!: FilterEntity;
  filterEntityInput!: FilterEntity;
  gridData!: GridDataResult;
  filtered = false;
  loadingOverlayVisible = this.loaderService.isLoading;
  filterFirst = false;
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

  constructor(
    private router: Router,
    private reportService: ReportService,
    private loaderService: LoaderService,
    private costCenterReportService: CostCenterReportService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      const filterEntity = <FilterEntity>state.filterEntity;
      this.filterEntityInput = filterEntity;
      this.loadCostCenterOverview(
        filterEntity.plantId!,
        filterEntity.costAccTypeId!,
        filterEntity.year?.getFullYear()!,
        filterEntity.year?.getMonth()! + 1,
        filterEntity.costCenterId,
        filterEntity
      );
    }
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
  }

  showFilterForm() {
    this.filterEntity = this.filterEntityInput
      ? this.filterEntityInput
      : new FilterEntity();
    this.filterFirst = !this.filterEntityInput;
  }

  cancelFilterForm() {
    this.filterEntity = undefined!;
    this.filterFirst = !this.filterEntityInput;
  }

  saveFilterForm(filterEntity: FilterEntity) {
    this.filterEntity = undefined!;
    this.filterEntityInput = filterEntity;
    this.loadCostCenterOverview(
      filterEntity.plantId!,
      filterEntity.costAccTypeId!,
      filterEntity.year?.getFullYear()!,
      filterEntity.year?.getMonth()! + 1,
      filterEntity.costCenterId,
      filterEntity
    );
    console.log('filtering...');
  }

  loadCostCenterOverview(
    plantId: number,
    costAccTypeId: number,
    year: number,
    month: number,
    costCenterId: number | undefined,
    filterEntity: FilterEntity
  ) {
    this.costCenterReportService
      .getCostCenterOverview(year, month, costAccTypeId, plantId)
      .subscribe((overview) => {
        if (costCenterId)
          overview = overview.filter(
            (row) => row.costCenter!.id === costCenterId
          );
        this.gridData = { data: overview, total: overview.length };
        this.filtered = true;
        this.reportMonths = this.reportService.setMonthHeader(filterEntity);
        this.sums = this.reportService.calculateSums(overview);
        console.log('finished');
      });
  }
}
