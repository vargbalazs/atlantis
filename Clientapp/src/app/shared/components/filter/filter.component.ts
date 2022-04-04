import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { SubmitFormComponent } from 'src/app/shared/components/submitform/submitform.component';
import { FilterEntity } from '../../models/filter.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { CalendarView } from '@progress/kendo-angular-dateinputs';
import { MsgDialogService } from '../../services/msgdialog.service';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { PlantService } from 'src/app/features/masterdata/general/plant/services/plant.service';
import { CostAccountingTypeService } from 'src/app/features/masterdata/planning/costacctype/services/costacctype.service';
import { CostCenterService } from 'src/app/features/masterdata/planning/costcenter/services/costcenter.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['../../../styles/dialog.css'],
})
export class FilterComponent
  extends SubmitFormComponent<FilterEntity>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  costAccTypes: CostAccountingType[] = [];
  costCenters: CostCenter[] = [];
  filteredCostCenters: CostCenter[] = [];
  decadeView: CalendarView = 'decade';
  yearView: CalendarView = 'year';

  formVisible = false;
  comboBoxValueChange = false;

  @Input() planning = false;
  @Input() frc = false;
  @Input() monthOverview = false;
  @Input() showAllCostCenter = false;
  @Input() firstClicked = false;

  form: FormGroup = new FormGroup({
    year: new FormControl(this.formData.year, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    costAccTypeId: new FormControl(this.formData.costAccTypeId),
    costAccType: new FormControl(this.formData.costAccType),
    costCenterId: new FormControl(this.formData.costCenterId),
    costCenter: new FormControl(this.formData.costCenter),
    allCostCenter: new FormControl(this.formData.allCostCenter),
  });

  constructor(
    private companyService: CompanyService,
    private plantService: PlantService,
    private costAccTypeService: CostAccountingTypeService,
    private costCenterService: CostCenterService,
    msgDialogService: MsgDialogService
  ) {
    super(msgDialogService);
  }

  ngOnInit() {
    forkJoin({
      companies: this.companyService.getCompanies().pipe(first()),
      plants: this.plantService.getPlants().pipe(first()),
      costAccTypes: this.costAccTypeService.getCostAccTypes().pipe(first()),
      costCenters: this.costCenterService.getCostCenters().pipe(first()),
    }).subscribe(({ companies, plants, costAccTypes, costCenters }) => {
      this.companies = companies;
      this.plants = plants;
      this.costAccTypes = costAccTypes;
      this.costCenters = costCenters;
    });
    this.changeControlState(['plant', 'year', 'costCenter'], false);
    if (this.frc || this.planning) {
      this.form.controls.costAccTypeId.setValidators(Validators.required);
      this.form.controls.costAccType.setValidators(Validators.required);
    }
    if (this.planning) {
      this.costCenterRequired(true);
    }
  }

  ngOnChanges() {
    this.formVisible = this.visible;
    if (!this.firstClicked) {
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.plantChange(this.form.get('plant')?.value);
      this.yearChange(this.form.get('year')?.value);
      this.comboBoxValueChange = false;
      if (this.planning)
        this.changeCostCenterState(this.form.get('allCostCenter')?.value);
    }
  }

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
    } else {
      this.setDefaults();
    }
    if (!this.comboBoxValueChange) this.form.patchValue({ plant: undefined });
    if (!this.comboBoxValueChange) this.form.patchValue({ year: undefined });
    if (!this.comboBoxValueChange)
      this.form.patchValue({ costCenter: undefined });
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.changeControlState(['year'], true);
    } else {
      this.changeControlState(['year', 'costCenter'], false);
    }
    if (!this.comboBoxValueChange) this.form.patchValue({ year: undefined });
    if (!this.comboBoxValueChange)
      this.form.patchValue({ costCenter: undefined });
  }

  yearChange(value: Date) {
    if (value) {
      this.filteredCostCenters = this.costCenters.filter(
        (costCenter) =>
          costCenter.plantId === +this.form.get('plantId')!.value &&
          costCenter.year === value.getFullYear()
      );
      this.changeControlState(
        ['costCenter'],
        !this.form.get('allCostCenter')?.value
      );
    } else {
      this.changeControlState(['costCenter'], false);
    }
    if (!this.comboBoxValueChange)
      this.form.patchValue({ costCenter: undefined });
  }

  costAccTypeChange(value: CostAccountingType) {
    if (value) this.form.patchValue({ costAccTypeId: value.id });
  }

  costCenterChange(value: CostCenter) {
    if (value) this.form.patchValue({ costCenterId: value.id });
  }

  allCostCenterChange(e: any) {
    const value = e.target ? e.target.checked : e;
    this.changeCostCenterState(value);
  }

  resetState() {
    if (!this.keepData) {
      this.setDefaults();
    }
    if (this.firstClicked) {
      this.setDefaults();
    }
  }

  setDefaults() {
    this.changeControlState(['plant', 'year', 'costCenter'], false);
    this.filteredPlants = [];
    this.filteredCostCenters = [];
  }

  changeCostCenterState(value: boolean) {
    if (value) {
      this.changeControlState(['costCenter', 'costCenterId'], false);
      this.form.patchValue({ costCenter: undefined });
      this.form.patchValue({ costCenterId: undefined });
    } else {
      this.changeControlState(['costCenter', 'costCenterId'], true);
      this.costCenterRequired(!value);
    }
  }

  costCenterRequired(value: boolean) {
    if (value) {
      this.form.controls.costCenterId.setValidators(Validators.required);
      this.form.controls.costCenter.setValidators(Validators.required);
    } else {
      this.form.controls.costCenterId.clearValidators();
      this.form.controls.costCenter.clearValidators();
    }
  }
}
