import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import localeHu from '@angular/common/locales/hu';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en-gb';
import '@progress/kendo-angular-intl/locales/hu/all';
import '@progress/kendo-angular-intl/locales/de/all';
import '@progress/kendo-angular-intl/locales/en-gb/all';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  supportedLocales = [
    { language: 'hu-HU', localeImport: localeHu },
    { language: 'de-AT', localeImport: localeDe },
    { language: 'de-DE', localeImport: localeDe },
    { language: 'en-GB', localeImport: localeEn },
  ];

  get currentLocale(): string {
    return this.translateService.currentLang;
  }

  get browserLocale(): string {
    return navigator.language;
  }

  constructor(private translateService: TranslateService) {}

  setLocale(language: string) {
    // edge provides only 'hu', that's why we use 'indexOf'
    const locale = this.supportedLocales.find(
      (locale) => locale.language.indexOf(language) >= 0
    );
    registerLocaleData(locale?.localeImport);
    this.translateService.use(language.substring(0, 2));
  }
}
