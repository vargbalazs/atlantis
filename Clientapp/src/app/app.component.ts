import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgDialogService } from './shared/services/msgdialog.service';
import { LocaleService } from './core/services/locale.service';
import { AuthService } from './core/services/auth.service';
import { MessageService } from '@progress/kendo-angular-l10n';
import { ComponentMessagesService } from './core/services/comp-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Atlantis';
  isMsgDialog = true;
  dialogType = 'danger';

  constructor(
    private router: Router,
    private msgDialogService: MsgDialogService,
    private localeService: LocaleService,
    private authService: AuthService,
    private componentMessages: MessageService
  ) {}

  ngOnInit() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });

    // this simple check is enough at this time; no use of fancy libraries or services needed
    if (navigator.userAgent.indexOf('trident') > 0) {
      this.msgDialogService.showDialog(
        'Atlantis',
        "Microsoft has great products, Internet Explorer isn't one of them. Please use an other browser.",
        [{ text: 'OK', primary: true }]
      );
      return;
    }

    // check locale and set it appr.
    if (
      // edge provides only 'hu', that's why we use 'indexOf'
      !this.localeService.supportedLocales.some(
        (locale) =>
          locale.language.indexOf(this.localeService.browserLocale) >= 0
      )
    ) {
      this.msgDialogService.showDialog(
        'Atlantis',
        'Your locale is currently not supported by the application. The locale will be set to english (en-GB).',
        [{ text: 'OK', primary: true }]
      );
      this.localeService.setLocale('en-GB');
      // no need to change the language for the translated kendo component messages,
      // because if there is no language found, the default messages will be applied (en)
    } else {
      this.localeService.setLocale(this.localeService.browserLocale);
      (<ComponentMessagesService>this.componentMessages).language =
        this.localeService.browserLocale.substring(0, 2);
    }
  }

  // remember me function
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: any) {
    if (!this.authService.isRememberMeActive()) this.authService.logout();
  }
}
