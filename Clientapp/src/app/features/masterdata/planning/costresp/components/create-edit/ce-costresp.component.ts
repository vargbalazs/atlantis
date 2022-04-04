import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { Department } from 'src/app/features/masterdata/general/department/models/department.model';
import { CostResp } from '../../models/costresp.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { CostCenter } from '../../../costcenter/models/costcenter.model';
import { Language } from 'src/app/features/masterdata/general/language/models/language.model';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { PlantService } from 'src/app/features/masterdata/general/plant/services/plant.service';
import { DepartmentService } from 'src/app/features/masterdata/general/department/services/department.service';
import { JobService } from 'src/app/features/masterdata/general/job/services/job.service';
import { CostCenterService } from '../../../costcenter/services/costcenter.service';
import { LanguageService } from 'src/app/features/masterdata/general/language/services/language.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ce-costresp',
  templateUrl: './ce-costresp.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostRespComponent
  extends CreateEditComponent<CostResp>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  departments: Department[] = [];
  jobs: Job[] = [];
  costCenters: CostCenter[] = [];
  languages: Language[] = [];
  filteredPlants: Plant[] = [];
  filteredDepartments: Department[] = [];
  filteredJobs: Job[] = [];
  filteredCostCenters: CostCenter[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    email: new FormControl(this.formData.email, [
      Validators.required,
      Validators.email,
    ]),
    lang: new FormControl(this.formData.lang, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    department: new FormControl(this.formData.department, [
      Validators.required,
    ]),
    job: new FormControl(this.formData.job, [Validators.required]),
    costCenter: new FormControl(this.formData.costCenter, [
      Validators.required,
    ]),
    langId: new FormControl(this.formData.langId, [Validators.required]),
    depId: new FormControl(this.formData.depId, [Validators.required]),
    jobId: new FormControl(this.formData.jobId, [Validators.required]),
    costCenterId: new FormControl(this.formData.costCenterId, [
      Validators.required,
    ]),
  });

  constructor(
    private companyService: CompanyService,
    private plantService: PlantService,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private costCenterService: CostCenterService,
    private langService: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    forkJoin({
      companies: this.companyService.getCompanies().pipe(first()),
      plants: this.plantService.getPlants().pipe(first()),
      departments: this.departmentService.getDepartments().pipe(first()),
      jobs: this.jobService.getJobs().pipe(first()),
      costcenters: this.costCenterService.getCostCenters().pipe(first()),
      languages: this.langService.getLanguages().pipe(first()),
    }).subscribe(
      ({ companies, plants, departments, jobs, costcenters, languages }) => {
        this.companies = companies;
        this.plants = plants;
        this.departments = departments;
        this.jobs = jobs;
        this.costCenters = costcenters;
        this.languages = languages;
      }
    );
    this.changeControlState(
      ['plant', 'department', 'job', 'costCenter'],
      false
    );
  }

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.plantChange(this.form.get('plant')?.value);
      this.departmentChange(this.form.get('department')?.value);
      this.jobChange(this.form.get('job')?.value);
      this.comboBoxValueChange = false;
    }
  }

  companyChange(company: Company) {
    if (company) {
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
      this.changeControlState(['department', 'job', 'costCenter'], false);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ department: undefined });
      this.form.patchValue({ job: undefined });
      this.form.patchValue({ costCenter: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.filteredDepartments = this.departments.filter(
        (department) => department.plantId === plant.id
      );
      this.filteredCostCenters = this.costCenters.filter(
        (costcenter) => costcenter.plantId === plant.id
      );
      this.changeControlState(['department'], true);
      this.changeControlState(['job', 'costCenter'], false);
    } else {
      this.filteredDepartments = [];
      this.filteredCostCenters = [];
      this.changeControlState(['department', 'job', 'costCenter'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ department: undefined });
      this.form.patchValue({ job: undefined });
      this.form.patchValue({ costCenter: undefined });
    }
  }

  departmentChange(department: Department) {
    if (department) {
      this.form.patchValue({ depId: department.id });
      this.filteredJobs = this.jobs.filter(
        (job) => job.depId === department.id
      );
      this.changeControlState(['job'], true);
      this.changeControlState(['costCenter'], false);
    } else {
      this.filteredJobs = [];
      this.changeControlState(['job', 'costCenter'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ job: undefined });
      this.form.patchValue({ costCenter: undefined });
    }
  }

  jobChange(job: Job) {
    if (job) {
      this.form.patchValue({ jobId: job.id });
      this.changeControlState(['costCenter'], true);
    } else {
      this.changeControlState(['costCenter'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ costCenter: undefined });
    }
  }

  costCenterChange(value: CostCenter) {
    this.form.patchValue({ costCenterId: value.id });
  }

  langChange(value: Language) {
    this.form.patchValue({ langId: value.id });
  }

  resetState() {
    this.changeControlState(
      ['plant', 'department', 'job', 'costCenter'],
      false
    );
    this.filteredPlants = [];
    this.filteredDepartments = [];
    this.filteredJobs = [];
    this.filteredCostCenters = [];
  }
}
