import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './base.component.html',
  styleUrls: [
    '../../../../styles/routed-component.css',
    './base.component.css',
  ],
})
export class HomeComponent {
  loadingOverlayVisible = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}
}
