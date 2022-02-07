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
import { LayoutService } from '../../services/start-layout.service';

@Component({
  selector: 'app-bar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppBarComponent implements OnInit, OnDestroy {
  showPopup: boolean = false;

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

  constructor(private LayoutService: LayoutService, private router: Router) {}

  ngOnInit() {
    this.searchBoxSub = this.LayoutService.clearSearchBox.subscribe(() => {
      this.searchBox.clearValue();
    });
  }

  ngOnDestroy() {
    this.searchBoxSub.unsubscribe();
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
    this.LayoutService.drawerToggleBtnClicked.next();
  }

  onSearchBoxValueChange(value: string) {
    this.LayoutService.searchBoxValueChanged.next(value);
  }

  goToHome() {
    this.router.navigate(['/home'], { skipLocationChange: true });
    //this.LayoutService.drawerToggleBtnClicked.next();
  }
}
