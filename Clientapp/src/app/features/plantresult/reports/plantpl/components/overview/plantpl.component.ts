import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { IReportMonth } from 'src/app/shared/interfaces/reportmonth.interface';
import { IReportSum } from 'src/app/shared/interfaces/reportsum.interface';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PlantPlReportService } from '../../services/plantpl-report.service';
import { CostGroupService } from 'src/app/features/masterdata/planning/costgroup/services/costgroup.service';

@Component({
  selector: 'plantpl',
  templateUrl: './plantpl.component.html',
  styleUrls: [
    '../../../../../../styles/routed-component.css',
    './plantpl.component.css',
  ],
})
export class PlantPlOverviewComponent implements OnInit {
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
  aggregates!: any[];
  groups!: GroupDescriptor[];
  collapsed = false;
  costGroups!: CostGroup[];

  @ViewChild('grid') grid!: GridComponent;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private loaderService: LoaderService,
    private plantPlService: PlantPlReportService,
    private costGroupService: CostGroupService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      const filterEntity = <FilterEntity>state.filterEntity;
      this.filterEntityInput = filterEntity;
      this.loadData(filterEntity);
    }
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.aggregates = [
      { field: 'budget', aggregate: 'sum' },
      { field: 'actual', aggregate: 'sum' },
      { field: 'monthDiff', aggregate: 'sum' },
      { field: 'frc', aggregate: 'sum' },
      { field: 'monthFrcDiff', aggregate: 'sum' },
      { field: 'cumBudget', aggregate: 'sum' },
      { field: 'cumActual', aggregate: 'sum' },
      { field: 'cumDiff', aggregate: 'sum' },
    ];
    this.groups = [
      { field: 'costGroup.rowIndex', aggregates: this.aggregates },
    ];
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
    this.loadData(filterEntity);
  }

  loadPlantPlOverview(
    plantId: number,
    companyId: number,
    costAccTypeId: number,
    year: number,
    month: number,
    filterEntity: FilterEntity
  ) {
    this.plantPlService
      .getPlantPl(year, month, costAccTypeId, plantId, companyId)
      .subscribe((plantPl) => {
        this.gridData = { data: plantPl, total: plantPl.length };
        this.filtered = true;
        this.reportMonths = this.reportService.setMonthHeader(filterEntity);
        this.sums = this.reportService.calculateSums(plantPl);
      });
  }

  toggleGroupState() {
    this.collapsed = this.reportService.toggleGroupState(
      this.collapsed,
      this.gridData,
      this.grid
    );
  }

  getCostGroupName(rowIndex: number): string {
    return this.costGroups.find((costGroup) => costGroup.rowIndex === rowIndex)
      ?.name!;
  }

  loadData(filterEntity: FilterEntity) {
    this.costGroupService
      .getCostGroups(filterEntity.companyId)
      .subscribe((costGroups) => {
        this.costGroups = costGroups;
        this.loadPlantPlOverview(
          filterEntity.plantId!,
          filterEntity.companyId!,
          filterEntity.costAccTypeId!,
          filterEntity.year?.getFullYear()!,
          filterEntity.year?.getMonth()! + 1,
          filterEntity
        );
      });
  }
}
