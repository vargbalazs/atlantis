import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { drawerItem } from '../components/sidebar/sidebar-item.type';
import { drawerItemsFlattened } from '../components/sidebar/sidebar-items-flat';

@Injectable()
export class SideBarService {
  constructor(private translateService: TranslateService) {}

  /**
   * adds children from the given index to the drawerItems array
   *
   * @param {drawerItem[]} drawerItems
   * @param {number} index
   * @param {drawerItem[]} children
   * @memberof SideBarHelperService
   */
  addChildren(
    drawerItems: drawerItem[],
    index: number,
    children: drawerItem[]
  ) {
    drawerItems.splice(index + 1, 0, ...children);
  }

  /**
   * removes items from the drawerItems array based on the id and returns a new array
   *
   * @param {string} id
   * @param {drawerItem[]} drawerItems
   * @return {*}  {drawerItem[]}
   * @memberof SideBarHelperService
   */
  removeChildren(id: string, drawerItems: drawerItem[]): drawerItem[] {
    return drawerItems.filter((item) => !item.id.startsWith(`${id}.`));
  }

  /**
   * sets the selected property for all items to false
   *
   * @param {drawerItem[]} drawerItems
   * @memberof SideBarHelperService
   */
  clearSelection(drawerItems: drawerItem[]) {
    drawerItems.forEach((item) => {
      if (item.selected) {
        item.selected = false;
      }
    });
  }

  /**
   * sets the expanded state for all items to false
   *
   * @param {drawerItem[]} drawerItems
   * @memberof SideBarHelperService
   */
  clearExpandedStateForAll(drawerItems: drawerItem[]) {
    drawerItems.forEach((item) => {
      if (item.expanded) {
        item.expanded = false;
      }
    });
  }

  /**
   * sets the expanded state based on the id to false
   *
   * @param {drawerItem[]} drawerItems
   * @param {string} id
   * @memberof SideBarHelperService
   */
  clearExpandedStateForChild(drawerItems: drawerItem[], id: string) {
    drawerItems.forEach((item) => {
      if (item.expanded && item.id.startsWith(`${id}.`)) {
        item.expanded = false;
      }
    });
  }

  /**
   * it creates a clone array from the flattened drawer data
   *
   * @param {drawerItem[]} drawerItems
   * @return {*}  {drawerItem[]}
   * @memberof SideBarService
   */
  cloneFlattenedData(drawerItems: drawerItem[]): drawerItem[] {
    const clonedItems: drawerItem[] = [];
    drawerItemsFlattened.forEach((item) => {
      clonedItems.push(Object.assign({}, item));
    });
    clonedItems.forEach(
      (item) => (item.text = this.translateService.instant(item.text))
    );
    return clonedItems;
  }

  /**
   * it searches the children of a given item in the flattened data based on the id of the parent
   * it checks too, whether this item in the 'newItems' exists in order to prevent adding duplicates
   * if it isn't exists, adds the item to the childrens array
   * and finally we add this childrens array to the 'newItems'
   *
   * @param {drawerItem[]} newItems
   * @param {drawerItem[]} draweritemsFlat
   * @param {string} id
   * @param {number} index
   * @memberof SideBarService
   */
  addChildrenOnId(
    newItems: drawerItem[],
    draweritemsFlat: drawerItem[],
    id: string,
    index: number
  ) {
    const childrens: drawerItem[] = [];
    draweritemsFlat.forEach((item) => {
      const flatId = item.id;
      const alreadyExists = newItems.some((item) => item.id === flatId);
      if (item.id.startsWith(`${id}.`) && !alreadyExists) {
        childrens.push(Object.assign({}, item));
      }
    });
    newItems.splice(index + 1, 0, ...childrens);
  }

  /**
   * it sets the expanded state for filtered parent items
   *
   * @param {drawerItem[]} newItems
   * @memberof SideBarService
   */
  setExpandedForFiltered(newItems: drawerItem[]) {
    newItems.forEach((item) => {
      if (item.parent) {
        const parent = item;
        // expand only, if in the hit list there are children too
        const childrenExists = newItems.some((item) =>
          item.id.startsWith(`${parent.id}.`)
        );
        item.expanded = childrenExists;
      }
    });
  }

  /**
   * gets the parent item based on the child id
   *
   * @param {string} id
   * @return {*}  {(drawerItem | undefined)}
   * @memberof SideBarService
   */
  getParent(id: string): drawerItem | undefined {
    const parentId = drawerItemsFlattened.find(
      (item) => item.id === id
    )?.parentId;
    return drawerItemsFlattened.find((item) => item.id === parentId);
  }

  /**
   * the func creates an array, which contains the hit list items (newItems) and their corresponding parents in the right order
   *
   * @param {drawerItem[]} newItems
   * @return {*}  {drawerItem[]}
   * @memberof SideBarService
   */
  mergeWithParents(newItems: drawerItem[]): drawerItem[] {
    // get the relevant parents (the parents based on the hitlist item id)
    const parents = drawerItemsFlattened.filter(
      (item) =>
        item.parent &&
        newItems.some((resultItem) => resultItem.id.startsWith(`${item.id}`)) // `${item.id}.`
      // without the dot, if the search term is only present in the parent, we get the parent too (f. e. the topmost parent)
      // originally, it was with the dot
    );
    let mergedItems: drawerItem[] = [];
    // insert the parents and the hitlist elements into the new 'mergedItems' array according to their id's
    // let index = 1;
    for (let i = 0; i <= parents.length - 1; i++) {
      const parentId = parents[i].id;
      const children = newItems.filter((item) => item.parentId === parentId);
      // first the parent
      mergedItems.push(Object.assign({}, parents[i]));
      // then the children
      for (let j = 0; j <= children.length - 1; j++) {
        mergedItems.push(Object.assign({}, children[j]));
      }
    }
    // remove duplicate parents, because without the dot id search, we can get the parent twice:
    // first: the parent itself, second: as the parent of the found child
    mergedItems = mergedItems.filter(
      (val, ind, arr) => arr.findIndex((item) => item.id === val.id) === ind
    );
    mergedItems.forEach(
      (item) => (item.text = this.translateService.instant(item.text))
    );
    return mergedItems;
  }

  // translate the hierarchycal data
  translateItemsRecursively(items: drawerItem[]) {
    items.forEach((item) => {
      item.text = this.translateService.instant(item.text);
      if (item.children) this.translateItemsRecursively(item.children);
    });
  }
}
