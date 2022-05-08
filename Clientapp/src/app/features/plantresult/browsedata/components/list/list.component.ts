import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Booking } from '../../models/booking.model';
import { BrowseDataService } from '../../services/browsedata.service';

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
  loadingOverlayVisible = this.loaderService.isLoading;
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

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private browseDataService: BrowseDataService,
    private translateService: TranslateService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (this.state) {
      this.routedFilterEntity = <FilterEntity>this.state.filterEntity;
      this.filtered = true;
      if (this.state.origin === 'costcenter') {
        this.costCenter = <CostCenter>this.state.costCenter;
        this.costAccount = <CostAccount>this.state.costAccount;
        this.navItems[0].text = this.translateService.instant(
          'breadCrumb.overview'
        );
        this.navItems[1].text = this.costCenter.code;
        this.navItems[2].text = this.costAccount.accountNumber;
      }
      if (this.state.origin === 'plantpl') {
        this.costAccount = <CostAccount>this.state.costAccount;
        this.navItems[0].text =
          this.translateService.instant('sidebar.plantPl');
        this.navItems[1].text = this.costAccount.accountNumber;
        this.navItems.pop();
      }
    }
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    if (this.state) {
      if (this.state.origin === 'costcenter') {
        this.browseDataService
          .getBookingsForCostCenter(
            this.costCenter.code!,
            this.routedFilterEntity.plantId!,
            this.routedFilterEntity.year?.getFullYear()!,
            this.routedFilterEntity.year?.getMonth()! + 1,
            this.costAccount.accountNumber!
          )
          .subscribe((bookings) => {
            this.convertBookingsDate(bookings);
            this.gridData = { data: bookings, total: bookings.length };
          });
      }
      if (this.state.origin === 'plantpl') {
        this.browseDataService
          .getBookingsForAccountNumber(
            this.costAccount.accountNumber!,
            this.routedFilterEntity.plantId!,
            this.routedFilterEntity.year?.getFullYear()!,
            this.routedFilterEntity.year?.getMonth()! + 1
          )
          .subscribe((bookings) => {
            this.convertBookingsDate(bookings);
            this.gridData = { data: bookings, total: bookings.length };
          });
      }
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
    this.browseDataService
      .getBookings(
        filterEntity.plantId!,
        filterEntity.year?.getFullYear()!,
        filterEntity.year?.getMonth()! + 1
      )
      .subscribe((bookings) => {
        this.convertBookingsDate(bookings);
        this.gridData = { data: bookings, total: bookings.length };
        this.filtered = true;
      });
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

  converToDate(date: string): Date {
    return new Date(
      +date.toString().substring(0, 4),
      +date.toString().substring(5, 7) - 1,
      +date.toString().substring(8, 10)
    );
  }

  convertBookingsDate(bookings: Booking[]) {
    bookings.forEach((booking) => {
      booking.docDate = this.converToDate(booking.docDate!.toString());
      booking.bookingDate = this.converToDate(booking.bookingDate!.toString());
      booking.postingDate = this.converToDate(booking.postingDate!.toString());
    });
  }
}
