import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { BasketItem } from './menu';
 
@Injectable()
export class BasketService {
    private subject = new Subject<any>();
 
    sendMessage(basketItem: BasketItem) {
        this.subject.next({ basketItem });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}