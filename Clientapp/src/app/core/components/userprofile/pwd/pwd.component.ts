import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'pwd',
  templateUrl: './pwd.component.html',
  styleUrls: [],
})
export class PwdComponent {
  @Input() visible = false;
  @Input() userName = '';
  loadingOverlayVisible = this.loaderService.isLoading;
  fromProfile = true;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  closeForm() {
    this.visible = false;
  }

  onSave() {
    this.authService.changePwdSub.next(this.userName);
  }
}
