import { Injectable } from '@angular/core';
import { Observable ,  Subject, BehaviorSubject } from 'rxjs';
import { BasketItem } from './menu';
 
@Injectable()
export class BasketService {
    private subject = new Subject<any>();
    private instructionSubject = new Subject<any>();
    private itemsInBasketSubject: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);
    private itemsInBasket: BasketItem[] = [];

  constructor() {
    this.itemsInBasketSubject.subscribe(_ => this.itemsInBasket = _);
  }

    sendMenuItem(basketItem: BasketItem) {
        this.subject.next({ basketItem });
    }  
 
    clearMessage() {
        this.subject.next();
    }
 
    getMenuItem(): Observable<any> {
        return this.subject.asObservable();
    }

    sendInstructions(basketItem: BasketItem) {
        this.instructionSubject.next({ basketItem });
    }

    getInstructions(): Observable<any> {
        return this.instructionSubject.asObservable();
    }

    clearInstructions() {
        this.instructionSubject.next();
    }   
    
}