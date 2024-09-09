import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Data } from '../models/data';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly LOCAL_STORAGE_KEY = 'data';
  private dataSubject = new BehaviorSubject<Data[]>(this.loadDataFromLocalStorage());
  public data$: Observable<Data[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    if (!this.loadDataFromLocalStorage().length) {
      this.loadInitialData().subscribe();
    }
  }

  private loadDataFromLocalStorage(): Data[] {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  private saveData(data: Data[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  private loadInitialData(): Observable<Data[]> {
    return this.http.get<Data[]>('assets/data.json').pipe(
      tap(data => {
        this.saveData(data);
        this.dataSubject.next(data);
      }),
      catchError(() => of([]))
    );
  }

  getData(): Observable<Data[]> {
    return this.data$;
  }

  updateData(data: Data[]): void {
    this.saveData(data);
    this.dataSubject.next(data);
  }

  addEntry(newEntry: Data): void {
    const data = this.loadDataFromLocalStorage();
    newEntry.id = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    data.push(newEntry);
    this.saveData(data);
    this.dataSubject.next(data);
  }

  editEntry(updatedEntry: Data): void {
    const data = this.loadDataFromLocalStorage();
    const index = data.findIndex(item => item.id === updatedEntry.id);
    if (index !== -1) {
      data[index] = updatedEntry;
      this.saveData(data);
      this.dataSubject.next(data);
    }
  }

  deleteEntry(id: number): void {
    let data = this.loadDataFromLocalStorage();
    data = data.filter(item => item.id !== id);
    this.saveData(data);
    this.dataSubject.next(data);
  }
}
