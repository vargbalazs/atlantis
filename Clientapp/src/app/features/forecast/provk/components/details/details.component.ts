import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';
import { capTypes } from 'src/app/features/masterdata/production/captype/components/list/sampledata';
import { capGroups } from 'src/app/features/masterdata/production/capgroup/components/list/sampledata';
import { CapTypeService } from 'src/app/features/masterdata/production/captype/services/captype.service';
import { ProvkDetail } from '../../models/provkdetail.model';
import { SalesDetail } from '../../models/salesdetail.model';
import { ProvkService } from '../../services/provk.service';
import { provkDetails } from './sampledata';
import { salesDetails } from '../salesdetails/sampledata';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'provk-details',
  templateUrl: './details.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './details.component.css',
  ],
})
export class ProvkDetailsComponent implements OnInit {
  loadingOverlayVisible = this.loaderService.isLoading;
  loadingOverlayVisibleGrid = false;
  salesProductsVisible = false;
  isInEditMode = false;
  company!: string;
  companyId!: number;
  plant!: string;
  year!: number;
  month!: number;
  version!: number;
  provkId!: number;
  plantId!: number;
  selectedCapTypeId!: string;
  isMsgDialog = true;
  dialogType = 'danger';

  items: PanelBarItemModel[] = [];
  provkDetails: ProvkDetail[] = [];
  salesDetails: SalesDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private capTypeService: CapTypeService,
    private provkService: ProvkService,
    private msgDialogService: MsgDialogService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.company = this.route.snapshot.queryParamMap.get('company')!;
    this.plant = this.route.snapshot.queryParamMap.get('plant')!;
    this.year = +this.route.snapshot.queryParamMap.get('year')!;
    this.month = +this.route.snapshot.queryParamMap.get('month')!;
    this.version = +this.route.snapshot.queryParamMap.get('version')!;
    this.provkId = +this.route.snapshot.queryParamMap.get('provkId')!;
    this.plantId = +this.route.snapshot.queryParamMap.get('plantId')!;
    this.companyId = +this.route.snapshot.queryParamMap.get('companyId')!;

    // this.capTypeService.getCapTypes(this.plantId).subscribe((capTypes) => {
    //   this.items = capTypes.map((item) => {
    //     return <PanelBarItemModel>{
    //       title: item.capType,
    //       id: item.id?.toString(),
    //     };
    //   });
    // // add the item for sales products
    // this.items.push(<PanelBarItemModel>{
    //   title: 'Értékesített termékek',
    //   id: 'sales',
    // });
    //   // get the details for the first capType and select it
    //   this.provkService
    //     .getProvkDetails(
    //       this.provkId,
    //       this.year,
    //       this.month,
    //       this.version,
    //       +this.items[0].id
    //     )
    //     .subscribe((details) => {
    //       this.provkDetails = details;
    //       this.items[0].selected = true;
    //       this.selectedCapTypeId=this.items[0].id;
    //       this.loadingOverlayVisible = false;
    //     });
    // });

    setTimeout(() => {
      // filter the capTypes array based on the plant id
      this.items = capTypes
        .filter((item) => item.plantId === this.plantId)
        .map((item) => {
          return <PanelBarItemModel>{
            title: item.capType,
            id: item.id?.toString(),
          };
        });

      // add the item for sales products
      this.items.push(<PanelBarItemModel>{
        title: 'Értékesített termékek',
        id: 'sales',
      });

      // get the details for the first capType and select it
      this.getDetails(
        this.provkId,
        this.year,
        this.month,
        this.version,
        this.items[0].id
      );
      this.items[0].selected = true;
      this.selectedCapTypeId = this.items[0].id;
    }, 1500);
  }

  getDetails(
    provkId: number,
    year: number,
    month: number,
    version: number,
    capTypeId: string
  ) {
    this.provkDetails = [];
    capGroups.forEach((capGroup) => {
      // get the capgroups for the plant and for the selected captyp
      if (
        capGroup.plantId === this.plantId &&
        capGroup.capTypeId === +capTypeId
      ) {
        // add an entry pro capgroup and set the appr. properties of the provkdetails model
        this.provkDetails.push({
          id: -1,
          provkId: provkId,
          year: year,
          month: month,
          version: version,
          capGroupId: capGroup.id,
          value: 0,
          capGroup: capGroup,
          ba: 0,
        });
      }
    });

    // if there are already some details, then override the appr. properties
    this.provkDetails.forEach((item) => {
      provkDetails.forEach((detail) => {
        if (
          item.provkId === detail.provkId &&
          item.year === detail.year &&
          item.month === detail.month &&
          item.version === detail.version &&
          item.capGroup?.id === detail.capGroupId
        ) {
          item.id = detail.id;
          item.value = detail.value;
          item.ba =
            (detail.value! - item.capGroup?.normalCap! / 12) *
            item.capGroup?.fixRate!;
        }
      });
    });

    // this.provkDetails = provkDetails.filter(
    //   (item) =>
    //     item.provkId === provkId &&
    //     item.year === year &&
    //     item.month === month &&
    //     item.version === version &&
    //     item.capGroup?.capTypeId === +capTypeId
    // );
  }

  onPanelChange(event: PanelBarItemModel[]) {
    // get the selected item id and load the capGroups (details) for this id
    let selectedItem = event.find((item) => item.selected === true);

    // check if in edit mode
    if (this.isInEditMode) {
      this.showEditModeDialog();
      // prevent the selected state
      this.items = this.items.map((item) => {
        if (item.id === this.selectedCapTypeId) {
          return { ...item, selected: true };
        }
        if (item.id === selectedItem!.id) {
          return { ...item, selected: false };
        }
        return item;
      });
      return;
    }

    this.selectedCapTypeId = selectedItem!.id;
    // if we clicked the sales products
    this.salesProductsVisible = selectedItem!.id === 'sales';

    this.loadingOverlayVisibleGrid = true;

    if (!this.salesProductsVisible) {
      // this.provkService
      //   .getProvkDetails(
      //     this.provkId,
      //     this.year,
      //     this.month,
      //     this.version,
      //     this.selectedCapTypeId
      //   )
      //   .subscribe((details) => {
      //     this.provkDetails = details;
      //     this.loadingOverlayVisibleGrid = false;
      //   });

      setTimeout(() => {
        this.getDetails(
          this.provkId,
          this.year,
          this.month,
          this.version,
          this.selectedCapTypeId
        );
        this.loadingOverlayVisibleGrid = false;
      }, 1500);
    } else {
      // this.provkService
      //   .getSalesDetails(this.provkId, this.year, this.month, this.version)
      //   .subscribe((result) => {
      //     this.salesDetails = result;
      //     this.loadingOverlayVisibleGrid = false;
      //   });
      setTimeout(() => {
        this.salesDetails = salesDetails;
        this.loadingOverlayVisibleGrid = false;
      }, 1500);
    }
  }

  goBack() {
    // check if in edit mode
    if (this.isInEditMode) {
      this.showEditModeDialog();
      return;
    }
    // go back to the provk page and load the provks for the plant and year
    this.router.navigate(['/forecast/provk'], {
      skipLocationChange: true,
      queryParams: {
        year: this.year,
        companyId: this.companyId,
        plantId: this.plantId,
        goBack: 1,
      },
    });
  }

  inEditMode(event: { editMode: boolean; selectedCapTypeId: string }) {
    this.isInEditMode = event.editMode;
    this.selectedCapTypeId = event.selectedCapTypeId;
  }

  showEditModeDialog() {
    this.msgDialogService.showDialog(
      'PROVK',
      'Mentetlen változások vannak. Először mentsd őket.',
      [{ text: 'Ok', primary: true }]
    );
  }
}
