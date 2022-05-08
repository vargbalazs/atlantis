// abstract class for handling the repetitive crud operations in a generic way

import { GridDataResult } from '@progress/kendo-angular-grid';
import { MsgDialogService } from '../services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { IRepository } from '../interfaces/repository.interface';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export abstract class Crud<T extends { id?: number }> {
  gridData!: GridDataResult;
  // we don't want this to initialize in the constructor, because the visibility of the dialog depends on it
  editDataItem!: T;
  isNew: boolean;
  loadingOverlayVisible: BehaviorSubject<boolean>;
  checkFunctionsOnSave: ((entity: T) => Observable<boolean>)[] = [];
  checkFunctionsOnDelete: ((entity: T) => Observable<boolean>)[] = [];
  isMsgDialog = false;
  dialogType = 'info' || 'danger';

  constructor(
    protected msgDialogService: MsgDialogService,
    protected notificationService: NotificationService,
    protected repositoryService: IRepository<T>,
    protected loaderService: LoaderService,
    protected translateService: TranslateService
  ) {
    this.isNew = false;
    this.loadingOverlayVisible = this.loaderService.isLoading;
  }

  addHandler() {
    this.editDataItem = <T>{};
    this.isNew = true;
  }

  saveHandler(entity: T) {
    // if we have check functions
    if (this.checkFunctionsOnSave.length > 0) {
      // stores the observables in an array and pass it to forkJoin
      const checkObservables: Observable<boolean>[] = [];
      this.checkFunctionsOnSave.forEach((fn) => {
        checkObservables.push(fn.call(this, entity).pipe(first()));
      });
      forkJoin(checkObservables).subscribe((result) => {
        // saves only if all checks are valid
        if (result.every((valid) => valid)) this.save(entity);
      });
    } else {
      this.save(entity);
    }
    this.resetDataItem();
  }

  save(entity: T) {
    if (this.isNew) {
      this.repositoryService.add!(entity).subscribe((id) => {
        entity.id = id;
        this.gridData.data = [...this.gridData.data, entity];
        this.showNotification(
          this.translateService.instant('notifications.addedSuccess'),
          3000,
          'success'
        );
      });
    } else {
      this.repositoryService.update!(entity).subscribe((id) => {
        this.gridData.data = this.gridData.data.map((item) =>
          item.id === entity.id ? entity : item
        );
        this.showNotification(
          this.translateService.instant('notifications.editedSuccess'),
          3000,
          'success'
        );
      });
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
        this.translateService.instant('dialog.delete'),
        this.translateService.instant('dialog.confirmDelete'),
        [
          { text: this.translateService.instant('dialog.no') },
          { text: this.translateService.instant('dialog.yes'), primary: true },
        ]
      )
      .result.subscribe((result) => {
        // the properties on the result are not direct accessible, that's why this hack
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          // if we have check functions
          if (this.checkFunctionsOnDelete.length > 0) {
            // stores the observables in an array and pass it to forkJoin
            const checkObservables: Observable<boolean>[] = [];
            this.checkFunctionsOnDelete.forEach((fn) => {
              checkObservables.push(fn.call(this, dataItem).pipe(first()));
            });
            forkJoin(checkObservables).subscribe((result) => {
              // deletes only if all checks are valid
              if (result.every((valid) => valid)) this.remove(dataItem);
            });
          } else {
            this.remove(dataItem);
          }
        }
      });
  }

  remove(entity: T) {
    // call a service to remove the item
    this.repositoryService.delete!(entity.id!).subscribe((id) => {
      // remove the item from grid
      this.gridData.data = this.gridData.data.filter(
        (item) => item.id !== entity.id
      );
      this.showNotification(
        this.translateService.instant('notifications.deleteSuccess'),
        3000,
        'success'
      );
    });
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
