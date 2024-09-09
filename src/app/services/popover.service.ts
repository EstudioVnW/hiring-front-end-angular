import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  private popoverSubject = new Subject<string>();

  popoverMessage$ = this.popoverSubject.asObservable();

  openPopover(popoverId : string) {
    this.popoverSubject.next(popoverId);
  }
  
}
