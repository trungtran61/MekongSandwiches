import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './menu/menu';

import { CartService } from './menu/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cartItems: BasketItem[] = [];
  cartTotal: number = 0;
  cartItems$: Observable<BasketItem[]>;

  constructor(private cartService: CartService) {

    this.cartItems$ = this
      .cartService
      .getItems();

    //this.cartItems$.subscribe(_ => _);
    this.cartItems$.subscribe( cartItems => 
      {
      this.cartItems = cartItems;      
      }
    ); 
  }

  getTotalAmount(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
}
