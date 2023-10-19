import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}

  private scrollSubject = new Subject<number>();

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }

  emitScrollEvent(scrollPosition: number) {
    this.scrollSubject.next(scrollPosition);
  }
}
