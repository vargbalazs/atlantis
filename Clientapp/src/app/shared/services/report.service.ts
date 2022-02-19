import { Injectable } from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { IReportMonth } from '../interfaces/reportmonth.interface';
import { IReportSum } from '../interfaces/reportsum.interface';
import { ActVsBudget } from '../models/actvsbudget.model';
import { FilterEntity } from '../models/filter.model';

@Injectable()
export class ReportService {
  constructor() {}

  calculateSums<T extends ActVsBudget>(data: T[]): IReportSum {
    let sumBudget = 0;
    let sumActual = 0;
    let sumCumBudget = 0;
    let sumCumActual = 0;
    let sumMonthDiff = 0;
    let sumCumDiff = 0;
    let sumFrc = 0;
    let sumMonthFrcDiff = 0;
    let sumCumFrc = 0;
    let sumCumFrcDiff = 0;
    for (let i = 0; i <= data.length - 1; i++) {
      sumBudget += data[i].budget!;
      sumActual += data[i].actual!;
      sumCumBudget += data[i].cumBudget!;
      sumCumActual += data[i].cumActual!;
      sumFrc += data[i].frc!;
      sumCumFrc += data[i].cumFrc!;
    }
    sumMonthDiff = sumBudget - sumActual;
    sumCumDiff = sumCumBudget - sumCumActual;
    sumMonthFrcDiff = sumFrc - sumActual;
    sumCumFrcDiff = sumCumFrc - sumCumActual;

    const sums = {
      sumBudget: sumBudget,
      sumActual: sumActual,
      sumCumBudget: sumCumBudget,
      sumCumActual: sumCumActual,
      sumMonthDiff: sumMonthDiff,
      sumCumDiff: sumCumDiff,
      sumFrc: sumFrc,
      sumCumFrc: sumCumFrc,
      sumMonthFrcDiff: sumMonthFrcDiff,
      sumCumFrcDiff: sumCumFrcDiff,
    };

    return sums;
  }

  setMonthHeader(filterEntity: FilterEntity): IReportMonth {
    let month = `${filterEntity.year?.getFullYear()} / ${
      filterEntity.year?.getMonth()! + 1
    }`;
    let cumMonth = `${filterEntity.year?.getFullYear()} / 1 - ${
      filterEntity.year?.getMonth()! + 1
    }`;
    return { actMonth: month, cumMonth: cumMonth };
  }

  toggleGroupState(
    collapsed: boolean,
    gridData: GridDataResult,
    grid: GridComponent
  ): boolean {
    if (collapsed) {
      gridData.data.forEach((_, index) => {
        grid.expandGroup(String(index));
      });
      return false;
    } else {
      gridData.data.forEach((_, index) => {
        grid.collapseGroup(String(index));
      });
      return true;
    }
  }
}
