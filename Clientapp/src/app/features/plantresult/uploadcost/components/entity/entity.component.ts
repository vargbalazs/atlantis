import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
})
export class EntityComponent implements OnInit {
  filteredPlants: Plant[] = [];
  comboBoxValueChange = false;

  @Input() entity!: FormGroup;
  @Input() formPassed!: boolean;
  @Input() companies!: Company[];
  @Input() plants!: Plant[];

  ngOnInit() {
    if (!this.formPassed) {
      this.entity.get('plant')?.disable();
    } else {
      this.comboBoxValueChange = true;
      this.companyChange(this.entity.get('company')?.value);
      this.comboBoxValueChange = false;
    }
  }

  companyChange(company: Company) {
    if (company) {
      this.entity.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.entity.get('plant')?.enable();
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) this.entity.patchValue({ plant: undefined });
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.entity.patchValue({ plantId: plant.id });
    }
  }

  resetState() {
    this.entity.get('plant')?.disable();
    this.entity.patchValue({ plant: undefined });
    this.entity.patchValue({ month: undefined });
    this.filteredPlants = [];
  }
}
