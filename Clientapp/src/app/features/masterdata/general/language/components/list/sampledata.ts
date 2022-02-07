import { Language } from '../../models/language.model';

export const languages: Language[] = [
  {
    id: 1,
    isoCode: 'HU',
    name: 'magyar',
    defaultLang: true,
  },
  {
    id: 2,
    isoCode: 'DE',
    name: 'német',
    defaultLang: false,
  },
  {
    id: 3,
    isoCode: 'EN',
    name: 'angol',
    defaultLang: false,
  },
];
