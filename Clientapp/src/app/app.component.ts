import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgDialogService } from './shared/services/msgdialog.service';
import { LocaleService } from './core/services/locale.service';

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
    private localeService: LocaleService
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

    if (
      !this.localeService.supportedLocales.some(
        (locale) => locale.language === this.localeService.browserLocale
      )
    ) {
      this.msgDialogService.showDialog(
        'Atlantis',
        'Your locale is currently not supported by the application. The locale will be set to english (en-GB).',
        [{ text: 'OK', primary: true }]
      );
      this.localeService.setLocale('en-GB');
    } else {
      this.localeService.setLocale(this.localeService.browserLocale);
    }
  }
}
