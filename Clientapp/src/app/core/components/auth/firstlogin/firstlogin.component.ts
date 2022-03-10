import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class FirstLoginComponent {
  loadingOverlayVisible = this.loaderService.isLoading;
  userName!: string;

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userName = this.router.getCurrentNavigation()?.extras.state?.userName;
  }

  changePwd() {
    this.authService.changePwdSub.next(this.userName);
  }
}
