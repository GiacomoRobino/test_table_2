import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }

  getCurrentPageSource(): BehaviorSubject<number> {
    return this.currentPageSource
  }

  setCurrentPage(page: number){
    this.currentPageSource.next(page);
  }
}
