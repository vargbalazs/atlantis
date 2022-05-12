import { MessageService } from '@progress/kendo-angular-l10n';
import { kendoDeMessages } from '../i18n/kendo-de.messages';
import { kendoHuMessages } from '../i18n/kendo-hu.messages';
import { kendoEnMessages } from '../i18n/kendo-en.messages';
import { TranslatedLang } from '../interfaces/translated-lang.interface';
import { Injectable } from '@angular/core';

const translatedLanguages: TranslatedLang[] = [
  kendoHuMessages,
  kendoDeMessages,
  kendoEnMessages,
];

@Injectable()
export class ComponentMessagesService extends MessageService {
  public set language(value: string) {
    const translatedLang = translatedLanguages.find(
      (item) => item.lang.locale === value
    );
    if (translatedLang) {
      this.localeId = value;
      this.notify(translatedLang.lang.rtl);
    }
  }

  public get language(): string {
    return this.localeId;
  }

  private localeId = '';

  private get messages(): Map<string, string> | null {
    const translatedLang = translatedLanguages.find(
      (item) => item.lang.locale === this.localeId
    );
    return translatedLang ? translatedLang.lang.messages : null;
  }

  public get(key: string): string | undefined {
    return this.messages ? this.messages.get(key) : undefined;
  }
}
