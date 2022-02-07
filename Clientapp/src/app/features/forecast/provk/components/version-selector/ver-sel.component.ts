import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProvkVersion } from '../../models/provkversion.model';

@Component({
  selector: 'version-selector',
  templateUrl: './ver-sel.component.html',
  styleUrls: ['./ver-sel.component.css'],
})
export class VersionSelectorComponent {
  hovered = false;
  formVisible = false;
  provkVersions!: ProvkVersion[];

  @Input() set versions(provkVersions: ProvkVersion[]) {
    this.formVisible = provkVersions !== undefined;
    this.provkVersions = provkVersions;
  }

  constructor(private router: Router) {}

  cardOverOut(item: ProvkVersion) {
    item.hovered = !item.hovered;
  }

  cardClick(item: ProvkVersion) {
    this.router.navigate(['/forecast/provk/details'], {
      skipLocationChange: true,
      queryParams: {
        company: item.company?.name,
        companyId: item.companyId,
        plant: item.plant?.code,
        year: item.year,
        month: item.month,
        version: item.version,
        provkId: item.provkId,
        plantId: item.plantId,
      },
    });
  }

  closeForm() {
    this.versions = undefined!;
  }
}
