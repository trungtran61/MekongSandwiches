import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import {of} from 'rxjs/observable/of';

import { BasketItem, MenuItem } from './menu';
import { ModalDataService } from '../shared/modal-data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MenuItemOptionsComponent } from './menu-item-options.component';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  subscription: Subscription;  
  instructionsSubscription : Subscription;
  basketItems: BasketItem[] = [];
  basketTotal: number = 0;
  basketTotals: string = '';
  message: string;
  cartItems$: Observable<BasketItem[]> = of([]);
  cartItems: BasketItem[] = [];
 

  constructor(private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private cartService: CartService,  
    private router: Router) {

    this.cartItems$ = this
      .cartService
      .getItems();

    this.cartItems$.subscribe(_ => this.cartItems = _);  
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks   
  }

  ngOnInit() {
    this.basketItems = JSON.parse(localStorage.getItem("MekongSandwichesBasket"));

    if (!this.basketItems)
      this.basketItems = [];
    else
      this.calculateTotals();
  }

  removeItem(index: number) {
    this.basketItems.splice(index, 1);
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
    this.calculateTotals();
}

  public removeCartItem(item: BasketItem) {
    this.cartService.removeFromCart(item)
  }

  updateQty(index: number) {
    if (this.basketItems[index].qty == 0) {
      this.removeItem(index);
    }
    else {
      this.calculateTotals();
    }
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
  }

  updateItemQty(item: BasketItem) {
    if (item.qty == 0) {
      this.cartService.removeFromCart(item)
    }   
    
  }

  addToBasket(basketItem: BasketItem) {
    //let basketItem: BasketItem = Object.assign(new BasketItem(), menuItem);
    this.basketItems.push(basketItem);
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
    this.calculateTotals();
  }

  calculateTotals() {
    this.basketTotal = 0;
    this.basketItems.forEach(x => this.basketTotal += x.qty * x.price);
    this.basketTotal += Math.round(this.basketTotal * .08);      // plus tax
    this.basketTotals = this.basketTotal.toFixed(2);    
  }

  openBasketItemOptions(basketItems: BasketItem[], index) {  
    // pass basket items and index to data  
    let basketItem: BasketItem = basketItems[index] ;
    basketItem.index = index;
    this.modalDataService.data = basketItem;
    const modal = this.modalService.show(MenuItemOptionsComponent, { 'class': 'modal-dialog-primary modal-lg' });
  }

  openCartItemOptions(item: BasketItem) {     
    this.modalDataService.data = item;
    const modal = this.modalService.show(MenuItemOptionsComponent, { 'class': 'modal-dialog-primary modal-lg' });
  }

  getTotalAmount(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  formatInstructions(basketItem: BasketItem) {
    let instructions: string = '';

    if (basketItem.instructions) {
      for (let i = 0; i < basketItem.instructions.length; i++) {
        instructions += basketItem.instructions[i].option + ' ' + basketItem.instructions[i].item + (i < basketItem.instructions.length - 1 ? ', ' : '');
      }
      return instructions;
    }
    else
      return '';
  }

  checkOut()
  {
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
    this.router.navigate(['/checkout']);
  }
}
