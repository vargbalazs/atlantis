import { Observable } from 'rxjs';

export interface IRepository<T> {
  add?(entity: T): Observable<number>;
  addArray?(entities: T[]): Observable<number>;
  update?(entity: T): Observable<number>;
  updateArray?(entities: T[]): Observable<number>;
  delete?(id: number): Observable<number>;
}
