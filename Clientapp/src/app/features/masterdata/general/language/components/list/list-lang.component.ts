import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from 'src/app/features/masterdata/general/language/models/language.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'general-language',
  templateUrl: './list-lang.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class LanguageComponent extends Crud<Language> implements OnInit {
  constructor(
    protected msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    protected languageService: LanguageService,
    loaderService: LoaderService,
    protected translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      languageService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.languageService.getLanguages().subscribe((languages) => {
      this.gridData = { data: languages, total: languages.length };
    });
    this.checkFunctionsOnSave.push(this.checkDefaultLang);
    this.checkFunctionsOnDelete.push(this.checkDefaultLang);
  }

  checkDefaultLang(entity: Language): Observable<boolean> {
    // only one language can be default resp. one language must be default
    this.isMsgDialog = true;
    this.dialogType = 'danger';
    const checkResult = this.languageService.checkDefault(entity).pipe(
      map((result) => {
        switch (result.message) {
          case 'firstLangShouldBeDefault':
            this.msgDialogService.showDialog(
              'Atlantis',
              this.translateService.instant('dialog.firstLangIsDefault'),
              [{ text: 'Ok', primary: true }]
            );
            return false;
          case 'multipleDefaultLang':
            this.msgDialogService.showDialog(
              'Atlantis',
              this.translateService.instant('dialog.onlyOneDefaultLang'),
              [{ text: 'Ok', primary: true }]
            );
            return false;
          case 'noDefaultLang':
            this.msgDialogService.showDialog(
              'Atlantis',
              this.translateService.instant('dialog.oneDefaultLang'),
              [{ text: 'Ok', primary: true }]
            );
            return false;
          case 'checkOk':
            return true;
          default:
            return false;
        }
      })
    );
    return checkResult;
  }
}
