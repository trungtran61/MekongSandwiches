import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
//import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { BasketItem, ContactInfo } from './menu';
import { environment } from '../../environments/environment';
@Injectable()
export class CartService {
    private itemNumber: number = 0;
    private subject = new Subject<any>();
    private instructionSubject = new Subject<any>();

    private itemsInCartSubject: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);
    private itemsInCart: BasketItem[] = [];

    constructor() {
        this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
    }

    public loadPreviousCart(): Observable<BasketItem[]>
    {        
        this.itemsInCartSubject = JSON.parse(localStorage.getItem("PreviousOrder"));
        console.log(this.itemsInCartSubject);
        return this.itemsInCartSubject.asObservable();
    }

    public addToCart(item: BasketItem) {
        item.index =  this.itemNumber;
        this.itemNumber++;
        this.itemsInCartSubject.next([...this.itemsInCart, item]);
    }

    public removeFromCart(item: BasketItem) {
        const currentItems = [...this.itemsInCart];
        const itemsWithoutRemoved = currentItems.filter(_ => _.index !== item.index);
        this.itemsInCartSubject.next(itemsWithoutRemoved);
    }

    public getItems(): Observable<BasketItem[]> {
        return this.itemsInCartSubject.asObservable();
    }

    public getTotalAmount(): Observable<number> {

        return this.itemsInCartSubject.map((items: BasketItem[]) => {
            return items.reduce((prev, curr: BasketItem) => {
                return prev + ((curr.price + curr.price * environment.taxRate) * curr.qty);
            }, 0);
        });
    }

    // handle special instructions 
    sendMenuItem(item: BasketItem) {
        this.subject.next({ item });
    }

    clearMessage() {
        this.subject.next();
    }

    getMenuItem(): Observable<any> {
        return this.subject.asObservable();
    }

    sendInstructions(item: BasketItem) {
        this.instructionSubject.next({ item });
    }

    getInstructions(): Observable<any> {
        return this.instructionSubject.asObservable();
    }

    clearInstructions() {
        this.instructionSubject.next();
    }

    saveCartToStorage()
    {
        localStorage.setItem("PreviousOrder", JSON.stringify(this.itemsInCart));        
    }

    saveContactInfo(contactInfo : ContactInfo)
    {
        localStorage.setItem("ContactInfo", JSON.stringify(contactInfo));
    }

    getContactInfo() 
    {
        let contactInfo : ContactInfo = new ContactInfo();
        contactInfo = JSON.parse(localStorage.getItem("ContactInfo"));
        return contactInfo;        
    }

    clearCart()
    {
        this.itemsInCart = [];
    }
}
