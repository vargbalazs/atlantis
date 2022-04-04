import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class LanguageService implements IRepository<Language> {
  constructor(private http: HttpClient) {}

  add(language: Language) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/general/language`,
      language
    );
  }

  update(language: Language) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/general/language`,
      language
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/general/language/${id}`
    );
  }

  checkDefault(language: Language) {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/api/masterdata/general/language/checkdefaultlang`,
      language
    );
  }

  getLanguages() {
    return this.http.get<Language[]>(
      `${environment.apiUrl}/api/masterdata/general/language`
    );
  }
}
