import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LayoutService {
  // subject for the toggle btn
  drawerToggleBtnClicked = new Subject<string>();

  // subject for the searchbox value changing
  searchBoxValueChanged = new Subject<string>();

  // subject for clearing the searchbox
  clearSearchBox = new Subject();
}
