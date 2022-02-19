import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IReportMonth } from 'src/app/shared/interfaces/reportmonth.interface';
import { IReportSum } from 'src/app/shared/interfaces/reportsum.interface';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { CostOverview } from '../../models/costoverview.model';
import { costOverview } from './sampledata';

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
  loadingOverlayVisible = false;
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

  constructor(private router: Router, private reportService: ReportService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.loadingOverlayVisible = true;
      const filterEntity = <FilterEntity>state.filterEntity;
      this.filterEntityInput = filterEntity;
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        const filteredData = this.loadCostCenterOverview(
          filterEntity.plantId!,
          filterEntity.costAccTypeId!,
          filterEntity.year!.getFullYear(),
          filterEntity.year!.getMonth() + 1,
          filterEntity.costCenterId
        );
        this.gridData = { data: filteredData, total: filteredData.length };
        this.filtered = true;
        this.reportMonths = this.reportService.setMonthHeader(filterEntity);
        this.sums = this.reportService.calculateSums(filteredData);
      }, 1500);
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
    this.loadingOverlayVisible = true;
    setTimeout(() => {
      this.loadingOverlayVisible = false;
      const filteredData = this.loadCostCenterOverview(
        filterEntity.plantId!,
        filterEntity.costAccTypeId!,
        filterEntity.year?.getFullYear()!,
        filterEntity.year?.getMonth()! + 1,
        filterEntity.costCenterId
      );
      this.gridData = { data: filteredData, total: filteredData.length };
      this.filtered = true;
      this.reportMonths = this.reportService.setMonthHeader(filterEntity);
      this.sums = this.reportService.calculateSums(filteredData);
      console.log('finished');
    }, 1500);
    console.log('filtering...');
  }

  loadCostCenterOverview(
    plantId: number,
    costAccTypeId: number,
    year: number,
    month: number,
    costCenterId: number | undefined
  ): CostOverview[] {
    const filteredData = costOverview.filter((item) => {
      if (!costCenterId) {
        return (
          item.plant?.id === plantId &&
          item.costAccType?.id === costAccTypeId &&
          item.year === year &&
          item.month === month
        );
      } else {
        return (
          item.plant?.id === plantId &&
          item.costAccType?.id === costAccTypeId &&
          item.year === year &&
          item.month === month &&
          item.costCenter?.id === costCenterId
        );
      }
    });
    return filteredData;
  }
}
