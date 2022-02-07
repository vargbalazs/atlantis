import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';

@Injectable()
export class LanguageService implements IRepository<Language> {
  constructor(private http: HttpClient) {}

  add(language: Language) {
    return this.http.post<number>('/api/masterdata/general/language', language);
  }

  update(language: Language) {
    return this.http.patch<number>(
      '/api/masterdata/general/language',
      language
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/masterdata/general/language/${id}`);
  }

  checkDefault(language: Language) {
    return this.http.post<string>(
      '/api/masterdata/general/chekdefault',
      language
    );
  }
}
