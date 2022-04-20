import { Component, OnInit } from '@angular/core';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Provk } from '../../models/provk.model';
import { ProvkVersion } from '../../models/provkversion.model';
import { ProvkService } from '../../services/provk.service';
import { MsgDialogService } from '../../../../../shared/services/msgdialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from 'src/app/shared/classes/crud.class';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'list-provk',
  templateUrl: './list-provk.component.html',
  styleUrls: ['../../../../../styles/routed-component.css'],
})
export class ProvkComponent extends Crud<Provk> implements OnInit {
  filterEntity!: FilterEntity;
  provkVersions!: ProvkVersion[];
  provks!: Provk[];
  versionSelectorVisible = false;
  listWasFiltered = false;
  companyId!: number;
  company!: Company;
  plantId!: number;
  plant!: Plant;
  year!: number;
  goBack!: number;
  minDate!: Date;
  maxDate!: Date;

  constructor(
    private provkService: ProvkService,
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(msgDialogService, notificationService, provkService, loaderService);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.checkFunctionsOnSave.push(this.checkMonth);
    this.checkFunctionsOnDelete.push(this.hasVersions);
    this.goBack = +this.route.snapshot.queryParamMap.get('goBack')!;
    if (this.goBack === 1) {
      this.companyId = +this.route.snapshot.queryParamMap.get('companyId')!;
      this.plantId = +this.route.snapshot.queryParamMap.get('plantId')!;
      this.year = +this.route.snapshot.queryParamMap.get('year')!;
      this.filterProvks(this.companyId, this.plantId, this.year);
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
    this.filterProvks(
      filterEntity.companyId!,
      filterEntity.plantId!,
      filterEntity.year?.getFullYear()!
    );
    this.company = filterEntity.company!;
    this.plant = filterEntity.plant!;
  }

  showVersionSelector(selectedProvk: Provk) {
    this.provkService
      .getProvkVersions(selectedProvk.id!)
      .subscribe((versions) => {
        if (versions.length === 0) {
          this.isMsgDialog = true;
          this.dialogType = 'info';
          this.msgDialogService.showDialog(
            'PROVK',
            'A kiválasztott PROVK-hoz nem tartozik egy verzió sem',
            [{ text: 'Ok', primary: true }]
          );
          return;
        }
        this.provkVersions = new Array<ProvkVersion>(...versions);
        this.provkVersions.sort((ver1, ver2) =>
          ver1.version! > ver2.version! ? 1 : -1
        );
      });
  }

  cancelVersionSelector() {
    this.provkVersions = undefined!;
  }

  checkMonth(provk: Provk): Observable<boolean> {
    const checkResult = this.provkService.checkMonth(provk).pipe(
      map((result) => {
        if (result) {
          this.isMsgDialog = true;
          this.dialogType = 'info';
          this.msgDialogService.showDialog(
            'PROVK',
            'Adott hónapra adott évben már létre lett hozva PROVK',
            [{ text: 'Ok', primary: true }]
          );
          return false;
        } else {
          return true;
        }
      })
    );
    return checkResult;
  }

  hasVersions(provk: Provk): Observable<boolean> {
    const checkResult = this.provkService.hasVersions(provk).pipe(
      map((result) => {
        if (result) {
          this.isMsgDialog = true;
          this.dialogType = 'info';
          this.msgDialogService.showDialog(
            'PROVK',
            'A törölni kívánt PROVK már tartalmaz legalább egy verziót, ezért a törlés nem lehetséges',
            [{ text: 'Ok', primary: true }]
          );
          return false;
        } else {
          return true;
        }
      })
    );
    return checkResult;
  }

  filterProvks(companyId: number, plantId: number, year: number) {
    this.provkService
      .getProvks(companyId!, plantId!, year!)
      .subscribe((result) => {
        this.provks = result;
        this.gridData = { data: this.provks, total: this.provks.length };
        this.listWasFiltered = true;
        this.year = year!;
        this.minDate = new Date(this.year, 0, 1);
        this.maxDate = new Date(this.year, 11, 1);
        this.company = this.provks[0].company!;
        this.plant = this.provks[0].plant!;
        console.log('finished');
      });
    console.log('filtering...');
  }

  addNewVersion(provk: Provk) {
    // get the next version number
    this.provkService.getNextVersionNumber(provk.id!).subscribe((result) => {
      // max version number reached
      if (result === -1) {
        this.isMsgDialog = true;
        this.dialogType = 'info';
        this.msgDialogService.showDialog(
          'PROVK',
          'Nem hozható létre több verzió, mert a verziók száma meghaladná a maximálisan létrehozható verziók számát',
          [{ text: 'Ok', primary: true }]
        );
        return;
      } else {
        // set the new version number and navigate to the details page
        // before that write the new version into the db
        let provkVersion = new ProvkVersion();
        provkVersion.provkId = provk.id;
        provkVersion.year = provk.year;
        provkVersion.month = provk.month;
        provkVersion.version = result;
        provkVersion.ba = 0;
        provkVersion.companyId = provk.companyId;
        provkVersion.plantId = provk.plantId;
        this.provkService.addNewVersion(provkVersion).subscribe(() => {
          provk.hovered = false;
          this.router.navigate(['/forecast/provk/details'], {
            skipLocationChange: true,
            queryParams: {
              company: provk.company?.name,
              companyId: provk.companyId,
              plant: provk.plant?.code,
              year: provk.year,
              month: provk.month,
              version: result,
              provkId: provk.id,
              plantId: provk.plantId,
            },
          });
        });
      }
    });
  }
}
