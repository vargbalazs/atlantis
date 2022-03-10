import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from 'src/app/features/masterdata/general/language/models/language.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { LanguageService } from '../../services/language.service';
import { languages } from './sampledata';

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
    loaderService: LoaderService
  ) {
    super(
      msgDialogService,
      notificationService,
      languageService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: languages, total: languages.length };
    this.checkFunctionsOnSave.push(this.checkDefaultLang);
    this.checkFunctionsOnSave.push(this.checkSomeOtherCondition);
    this.checkFunctionsOnDelete.push(this.checkDefaultLang);
  }

  checkSomeOtherCondition(entity: Language): Observable<boolean> {
    return of(true);
  }

  checkDefaultLang(entity: Language): Observable<boolean> {
    // only one language can be default resp. one language must be default
    // replace the 'of' with this, when the back end is ready for that
    // this.languageService.checkDefault(entity)

    // eventually we have to set the loadingOverlay to false
    const checkResult = of('checkOk').pipe(
      map((result) => {
        switch (result) {
          case 'multipleDefaultLang':
            this.msgDialogService.showDialog(
              'Nyelvek',
              'Csak egy alapértelmezett nyelv létezhet',
              [{ text: 'Ok' }]
            );
            return false;
          case 'noDefaultLang':
            this.msgDialogService.showDialog(
              'Nyelvek',
              'Egy alapértelmezett nyelvnek lennie kell',
              [{ text: 'Ok' }]
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
