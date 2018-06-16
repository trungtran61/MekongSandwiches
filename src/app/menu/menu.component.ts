import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MENU_ITEM_DATA } from './menu-item-data';
import { MenuItem, BasketItem } from './menu';
import { CartService } from './cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  basketItems: BasketItem[];
  menuItems1: MenuItem[];
  menuItems2: MenuItem[];
  basketItem: BasketItem;

  @Output() addToBasketEvent = new EventEmitter();

  constructor(
    private cartService: CartService
  ) { }

  getMenuItems(): void {
    this.menuItems1 = MENU_ITEM_DATA.filter(item => item.id < 8);
    this.menuItems2 = MENU_ITEM_DATA.filter(item => item.id > 7);
  }

  ngOnInit() {
    this.getMenuItems();
  }

  orderItem(menuItem: MenuItem) {
    this.basketItem = Object.assign(new BasketItem(), menuItem);    
    this.cartService.addToCart(this.basketItem);    
  }

  clearMessage(): void {
    this.cartService.clearMessage();
  }
}
