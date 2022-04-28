import { Component } from '@angular/core';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { MessageService } from '@progress/kendo-angular-l10n';
import { ComponentMessagesService } from 'src/app/core/services/comp-messages.service';
import { LocaleService } from 'src/app/core/services/locale.service';

@Component({
  selector: 'lang-selector',
  templateUrl: './langselector.component.html',
  styleUrls: ['./langselector.component.css'],
})
export class LangSelectorComponent {
  constructor(
    private localeService: LocaleService,
    private intlService: IntlService,
    private componentMessages: MessageService
  ) {}

  langChange(e: any) {
    const lang = e.getAttribute('lang-id').toString();
    this.localeService.setLocale(lang);
    (<CldrIntlService>this.intlService).localeId = lang;
    (<ComponentMessagesService>this.componentMessages).language =
      lang.substring(0, 2);
  }
}
