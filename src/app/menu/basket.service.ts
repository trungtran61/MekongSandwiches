import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { BasketItem } from './menu';
 
@Injectable()
export class BasketService {
    private subject = new Subject<any>();
    private instructionSubject = new Subject<any>();
 
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