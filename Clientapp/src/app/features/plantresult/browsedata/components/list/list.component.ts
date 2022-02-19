import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Booking } from '../../models/booking.model';
import { bookings } from './sampledata';

@Component({
  selector: 'browsedata',
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../styles/routed-component.css'],
})
export class BrowseDataComponent implements OnInit {
  filterEntity!: FilterEntity;
  filterEntityInput!: FilterEntity;
  gridData!: GridDataResult;
  filtered = false;
  loadingOverlayVisible = false;
  filterFirst = false;
  state: any;
  costCenter!: CostCenter;
  costAccount!: CostAccount;
  routedFilterEntity!: FilterEntity;
  navItems: BreadCrumbItem[] = [
    {
      text: '',
    },
    {
      text: '',
    },
    {
      text: '',
    },
  ];

  constructor(private router: Router) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (this.state) {
      this.routedFilterEntity = <FilterEntity>this.state.filterEntity;
      this.filtered = true;
      if (this.state.origin === 'costcenter') {
        this.costCenter = <CostCenter>this.state.costCenter;
        this.costAccount = <CostAccount>this.state.costAccount;
        this.navItems[0].text = 'Áttekintő';
        this.navItems[1].text = this.costCenter.code;
        this.navItems[2].text = this.costAccount.accountNumber;
      }
      if (this.state.origin === 'plantpl') {
        this.costAccount = <CostAccount>this.state.costAccount;
        this.navItems[0].text = 'Gyári eredménykimutatás';
        this.navItems[1].text = this.costAccount.accountNumber;
        this.navItems.pop();
      }
    }
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    if (this.state) {
      this.loadingOverlayVisible = true;
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        let filteredData: Booking[] = [];
        if (this.state.origin === 'costcenter') {
          filteredData = bookings.filter(
            (item) =>
              item.costCenter === this.costCenter.code &&
              item.year === this.routedFilterEntity.year?.getFullYear() &&
              item.month === this.routedFilterEntity.year?.getMonth()! + 1 &&
              item.accountNumber === this.costAccount.accountNumber
          );
        }
        if (this.state.origin === 'plantpl') {
          filteredData = bookings.filter(
            (item) =>
              item.year === this.routedFilterEntity.year?.getFullYear() &&
              item.month === this.routedFilterEntity.year?.getMonth()! + 1 &&
              item.accountNumber === this.costAccount.accountNumber
          );
        }
        this.gridData = { data: filteredData, total: filteredData.length };
      }, 1500);
    }
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
      const filteredData = bookings.filter(
        (booking) =>
          booking.plantId === filterEntity.plantId &&
          booking.year === filterEntity.year?.getFullYear() &&
          booking.month === filterEntity.year!.getMonth() + 1
      );
      this.gridData = { data: filteredData, total: filteredData.length };
      this.filtered = true;
      console.log('finished');
    }, 1500);
    console.log('filtering...');
  }

  onNavItemClick(item: BreadCrumbItem): void {
    const selectedItemIndex = this.navItems.findIndex(
      (navItem) => navItem.text === item.text
    );
    if (this.state.origin === 'costcenter')
      this.navigateCostCenter(selectedItemIndex);
    if (this.state.origin === 'plantpl')
      this.navigatePlantPl(selectedItemIndex);
  }

  navigateCostCenter(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/plantresult/costcenter'], {
          skipLocationChange: true,
          state: this.state,
        });
        break;
      case 1:
        this.router.navigate(['/plantresult/costcenter/details'], {
          skipLocationChange: true,
          state: this.state,
        });
        break;
    }
  }

  navigatePlantPl(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/plantresult/plantpl'], {
          skipLocationChange: true,
          state: this.state,
        });
        break;
    }
  }
}
