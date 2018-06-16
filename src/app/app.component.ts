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

  cartItems$: Observable<BasketItem[]>;

  constructor(private cartService: CartService) {

    this.cartItems$ = this
      .cartService
      .getItems();

    this.cartItems$.subscribe(_ => _);
  }
}
