import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  DrawerComponent,
  DrawerSelectEvent,
} from '@progress/kendo-angular-layout';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/start-layout.service';
import { drawerItem } from './sidebar-item.type';
import { SideBarService } from '../../services/sidebar.service';
import { drawerItemsHierarchy } from './sidebar-items-hierarchy';
import { drawerItemsFlattened } from './sidebar-items-flat';
import { ModuleInterface } from 'src/app/features/home/interfaces/module.interface';
import { HomeService } from 'src/app/features/home/services/home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SideBarService],
})
export class SideBarComponent implements OnInit, OnDestroy {
  drawerExpanded = false;
  item!: drawerItem;
  drawerItems = this.resetItems();
  drawerItemsFlat =
    this.sideBarService.cloneFlattenedData(drawerItemsFlattened);
  private newItems: drawerItem[] = [];
  private toggleSub!: Subscription;
  private searchBoxSub!: Subscription;
  searching = false;
  searchTerm: string = '';

  @ViewChild('drawer') drawer!: DrawerComponent;

  constructor(
    private router: Router,
    private sideBarService: SideBarService,
    private layoutService: LayoutService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    // subscription for the appbar toggle button
    this.toggleSub = this.layoutService.drawerToggleBtnClicked.subscribe(
      (state) => {
        this.toggle(state);
      }
    );
    // subscription for the search box
    this.searchBoxSub = this.layoutService.searchBoxValueChanged.subscribe(
      (value) => {
        this.searchTerm = value;
        this.searching = true;
        // if drawer isn't visible
        if (!this.drawerExpanded) {
          this.drawer.toggle();
        }
        // clear the draweritems state on each value change
        this.clear();
        // filter the flattened data
        this.newItems = this.drawerItemsFlat.filter((item) =>
          item.text.toLowerCase().includes(value)
        );
        // add the missing parents
        this.newItems = this.sideBarService.mergeWithParents(this.newItems);
        // set expanded states
        this.sideBarService.setExpandedForFiltered(this.newItems);
        this.drawerItems = this.newItems;
        // if the search value is empty, we also clear (restore the original state)
        if (!value) {
          // this.clear();
          // this.searching = false;
          this.toggle();
        }
      }
    );
  }

  ngOnDestroy() {
    this.toggleSub.unsubscribe();
    this.searchBoxSub.unsubscribe();
  }

  onSelect(e: DrawerSelectEvent): void {
    this.item = e.item;
    const id = e.item.id;

    // if the drawer is collapsed and we click on one of the icons, we expand it
    if (!this.drawerExpanded) {
      this.drawer.toggle();
    }

    // if item is no parent, then route to the given component and return
    if (!this.item.parent) {
      if (this.item.routePath) {
        this.router.navigate([`/${this.item.routePath}`], {
          skipLocationChange: true,
        });
        // start registering the event for the recently visited list
        const module: ModuleInterface = {
          name: this.item.text,
          routePath: this.item.routePath,
          icon: 'calendar-date',
          date: new Date(),
        };
        this.homeService.registerModule.next(module);
      }
      // after routing we toggle and clear the search box
      this.toggle();
      this.layoutService.clearSearchBox.next();
      return;
    }

    // we take a fresh start and reset the items to their original state,
    // but only if we click the first time on any item
    // in other cases 'newItems' must be not overridden
    if (this.newItems.length === 0) {
      this.newItems = this.resetItems();
    }

    // we set the 'selected' property on the clicked item to true (only parents should have the 'selected' property)
    // but before do it, we clear all selection
    // it has the effect, that the parent items have the '.k-state-selected' class too (background color set to primary)
    const index = this.newItems.findIndex((item) => item.id === id);
    this.sideBarService.clearSelection(this.newItems);
    this.newItems[index].selected = true;

    // we expand the clicked item - if not expanded - and add the children into the 'newItems' array
    // else we remove the unnecessary items based on the 'id' field and set 'expanded' to false
    // we set 'expanded' to false for the child items also
    if (!this.item.expanded) {
      this.newItems[index].expanded = true;
      // if the search box is empty, we need the basic behaviour as described above
      if (!this.searching) {
        this.sideBarService.addChildren(
          this.newItems,
          index,
          this.newItems[index].children!
        );
      }
      // if we are in search mode, we work with the flattened data
      // and therefore we need to populate the children property of the 'newItems' array, if there is any
      // and set the expanded state for the parent items
      else {
        this.sideBarService.addChildrenOnId(
          this.newItems,
          drawerItemsFlattened,
          this.item.id,
          index
        );
        this.sideBarService.setExpandedForFiltered(this.newItems);
      }
    } else {
      this.sideBarService.clearExpandedStateForChild(
        this.newItems,
        this.item.id
      );
      this.newItems = this.sideBarService.removeChildren(
        this.item.id,
        this.newItems
      );
      this.newItems[index].expanded = false;
    }

    // refresh the items in the component
    this.drawerItems = this.newItems;
  }

  public resetItems(): drawerItem[] {
    const clonedItems: drawerItem[] = [];
    drawerItemsHierarchy.forEach((item) => {
      clonedItems.push(Object.assign({}, item));
    });
    return clonedItems;
  }

  toggle(state?: string) {
    // it is needed to clear the state on 'newItems', because in the 'resetItems' function we only do a simple cloning on the top level
    // and so if we modify any child, it's get modified in the 'items' array too
    this.clear();
    if (!state) {
      this.drawer.toggle();
    } else {
      this.drawer.toggle(false);
    }
    this.searching = false;
  }

  clear() {
    this.sideBarService.clearSelection(this.newItems);
    this.sideBarService.clearExpandedStateForAll(this.newItems);
    this.newItems = [];
    this.drawerItems = this.resetItems();
  }

  drawerContentClicked() {
    this.toggle('hide');
  }
}
