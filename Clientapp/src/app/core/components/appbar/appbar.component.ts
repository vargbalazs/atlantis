import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { Align } from '@progress/kendo-angular-popup';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/start-layout.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppBarComponent implements OnInit, OnDestroy {
  showPopup = false;
  adminUser = false;
  user!: User;

  animateSettings: any = {
    type: 'fade',
    direction: 'down',
    duration: 200,
  };

  anchorAlign: Align = { horizontal: 'right', vertical: 'bottom' };
  popupAlign: Align = { horizontal: 'right', vertical: 'top' };
  margin = { horizontal: 0, vertical: 15 };

  @ViewChild('popupAnchor') popupAnchor!: ElementRef;
  @ViewChild('popup', { read: ElementRef }) popup!: ElementRef;
  @ViewChild('searchBox') searchBox!: TextBoxComponent;

  private searchBoxSub!: Subscription;
  private profileUpdatedSub!: Subscription;

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchBoxSub = this.layoutService.clearSearchBox.subscribe(() => {
      this.searchBox.clearValue();
    });
    this.profileUpdatedSub = this.userService.profielUpdated.subscribe(() => {
      this.showPopup = false;
    });
    this.adminUser =
      this.authService.getUserFromLocalCache().role === 'ROLE_SUPER_USER';
  }

  ngOnDestroy() {
    this.searchBoxSub.unsubscribe();
    this.profileUpdatedSub.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (!this.contains(event.target)) {
      this.togglePopup(false);
    }
  }

  private contains(target: any): boolean {
    return (
      this.popupAnchor.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }

  togglePopup(showPopup?: boolean) {
    this.showPopup = showPopup !== undefined ? showPopup : !this.showPopup;
  }

  onDrawerToggleBtnClick() {
    this.layoutService.drawerToggleBtnClicked.next();
  }

  onSearchBoxValueChange(value: string) {
    this.layoutService.searchBoxValueChanged.next(value);
  }

  goToHome() {
    this.router.navigate(['/home'], { skipLocationChange: true });
    //this.LayoutService.drawerToggleBtnClicked.next();
  }

  showAdminArea() {
    this.router.navigate(['/admin/userlist'], { skipLocationChange: true });
  }
}
