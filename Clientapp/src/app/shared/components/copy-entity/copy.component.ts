import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CopyEntity } from '../../models/copy.model';
import { SubmitFormComponent } from 'src/app/shared/components/submitform/submitform.component';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { PlantService } from 'src/app/features/masterdata/general/plant/services/plant.service';
import { MsgDialogService } from '../../services/msgdialog.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'copy-entity',
  templateUrl: './copy.component.html',
  styleUrls: ['../../../styles/dialog.css', './copy.component.css'],
})
export class CopyComponent
  extends SubmitFormComponent<CopyEntity>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  isMsgDialog = true;
  dialogType = 'danger';

  formVisible = false;

  form: FormGroup = new FormGroup({
    sourceYear: new FormControl(this.formData.sourceYear, [
      Validators.required,
    ]),
    targetYear: new FormControl(this.formData.targetYear, [
      Validators.required,
    ]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
  });

  constructor(
    private companyService: CompanyService,
    private plantService: PlantService,
    protected msgDialogService: MsgDialogService,
    private translateService: TranslateService
  ) {
    super(msgDialogService);
  }

  ngOnInit() {
    forkJoin({
      companies: this.companyService.getCompanies().pipe(first()),
      plants: this.plantService.getPlants().pipe(first()),
    }).subscribe(({ companies, plants }) => {
      this.companies = companies;
      this.plants = plants;
    });
    this.changeControlState(['plant'], false);
    this.checkFunctionsOnSaveClient.push(this.yearsAreNotTheSame);
  }

  ngOnChanges() {
    this.formVisible = this.visible;
  }

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
    } else {
      this.resetState();
    }
    this.form.patchValue({ plant: undefined });
  }

  plantChange(value: Plant) {
    this.form.patchValue({ plantId: value.id });
  }

  resetState() {
    this.changeControlState(['plant'], false);
    this.filteredPlants = [];
  }

  yearsAreNotTheSame(copyCostCenter: CopyEntity): boolean {
    if (
      copyCostCenter.sourceYear?.getFullYear() ===
      copyCostCenter.targetYear?.getFullYear()
    ) {
      this.msgDialogService.showDialog(
        this.translateService.instant('form.copy'),
        this.translateService.instant('dialog.sourceAndTargetAreTheSame'),
        [{ text: 'Ok', primary: true }]
      );
      return false;
    } else {
      return true;
    }
  }
}
