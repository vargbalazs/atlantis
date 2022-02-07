// abstract class for handling the repetitive crud operations in a generic way

import { GridDataResult } from '@progress/kendo-angular-grid';
import { MsgDialogService } from '../services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { IRepository } from '../interfaces/repository.interface';
import { forkJoin, Observable } from 'rxjs';

export abstract class Crud<T extends { id?: number }> {
  gridData!: GridDataResult;
  // we don't want this to initialize in the constructor, because the visibility of the dialog depends on it
  editDataItem!: T;
  isNew: boolean;
  loadingOverlayVisible: boolean;
  checkFunctionsOnSave: ((entity: T) => Observable<boolean>)[] = [];
  checkFunctionsOnDelete: ((entity: T) => Observable<boolean>)[] = [];
  isMsgDialog = false;
  dialogType = 'info' || 'danger';

  constructor(
    protected msgDialogService: MsgDialogService,
    protected notificationService: NotificationService,
    protected repositoryService: IRepository<T>
  ) {
    this.isNew = false;
    this.loadingOverlayVisible = false;
  }

  addHandler() {
    this.editDataItem = <T>{};
    this.isNew = true;
  }

  saveHandler(entity: T) {
    this.loadingOverlayVisible = true;
    // if we have check functions
    if (this.checkFunctionsOnSave.length > 0) {
      // stores the observables in an array and pass it to forkJoin
      const checkObservables: Observable<boolean>[] = [];
      this.checkFunctionsOnSave.forEach((fn) => {
        checkObservables.push(fn.call(this, entity));
      });
      forkJoin(checkObservables).subscribe((result) => {
        // saves only if all checks are valid
        if (result.every((valid) => valid)) {
          this.save(entity);
        } else {
          this.loadingOverlayVisible = false;
        }
      });
    } else {
      this.save(entity);
    }
    this.resetDataItem();
  }

  save(entity: T) {
    if (this.isNew) {
      // this.repositoryService.add(entity).subscribe((id) => {
      //   this.loadingOverlayVisible = false;
      //   console.log('finished');
      //   entity.id = id;
      //   this.gridData.data = [...this.gridData.data, entity];
      //   this.showNotification(
      //     'Az új elem sikeresen rögzítve lett',
      //     3000,
      //     'success'
      //   );
      // });
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        console.log('finished');
        this.gridData.data = [...this.gridData.data, entity];
        this.showNotification(
          'Az új elem sikeresen rögzítve lett',
          3000,
          'success'
        );
      }, 1500);
      console.log('saving...');
    } else {
      // this.repositoryService.update(entity).subscribe((id) => {
      //   this.loadingOverlayVisible = false;
      //   console.log('finished');
      //   this.gridData.data = this.gridData.data.map((item) =>
      //     item.id === entity.id ? entity : item
      //   );
      //   this.showNotification(
      //     'A módosítások sikeresen mentésre kerültek',
      //     3000,
      //     'success'
      //   );
      // });
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        console.log('finished');
        this.gridData.data = this.gridData.data.map((item) =>
          item.id === entity.id ? entity : item
        );
        this.showNotification(
          'A módosítások sikeresen mentésre kerültek',
          3000,
          'success'
        );
      }, 1500);
      console.log('saving...');
    }
  }

  editHandler({ dataItem }: { dataItem: T }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  removeHandler({ dataItem }: { dataItem: T }) {
    this.isMsgDialog = true;
    this.dialogType = 'danger';
    this.msgDialogService
      .showDialog(
        'Törlés',
        'Valóban törölni szeretnéd a kiválasztott elemet?',
        [{ text: 'Nem' }, { text: 'Igen', primary: true }]
      )
      .result.subscribe((result) => {
        // the properties on the result are not direct accessible, that's why this hack
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.loadingOverlayVisible = true;
          // if we have check functions
          if (this.checkFunctionsOnDelete.length > 0) {
            // stores the observables in an array and pass it to forkJoin
            const checkObservables: Observable<boolean>[] = [];
            this.checkFunctionsOnDelete.forEach((fn) => {
              checkObservables.push(fn.call(this, dataItem));
            });
            forkJoin(checkObservables).subscribe((result) => {
              // deletes only if all checks are valid
              if (result.every((valid) => valid)) {
                this.remove(dataItem);
              } else {
                this.loadingOverlayVisible = false;
              }
            });
          } else {
            this.remove(dataItem);
          }
        }
      });
  }

  remove(entity: T) {
    // call a service to remove the item
    // this.repositoryService.delete(dataItem.id!).subscribe((id) => {
    //   this.loadingOverlayVisible = false;
    //   console.log('finished');
    //   // remove the item from grid
    //   this.gridData.data = this.gridData.data.filter(
    //     (item) => item.id !== dataItem.id
    //   );
    //   this.showNotification(
    //     'A kiválasztott elem sikeresen törölve lett',
    //     3000,
    //     'success'
    //   );
    // });
    setTimeout(() => {
      this.loadingOverlayVisible = false;
      console.log('finished');
      // remove the item from grid
      this.gridData.data = this.gridData.data.filter(
        (item) => item.id !== entity.id
      );
      this.showNotification(
        'A kiválasztott elem sikeresen törölve lett',
        3000,
        'success'
      );
    }, 1500);
    console.log('deleting...');
  }

  cancelHandler() {
    this.resetDataItem();
  }

  resetDataItem() {
    this.editDataItem = undefined!;
  }

  showNotification(
    text: string,
    hideAfter: number,
    type: 'none' | 'success' | 'warning' | 'error' | 'info'
  ) {
    this.notificationService.show({
      content: text,
      hideAfter: hideAfter,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: type, icon: true },
    });
  }
}
