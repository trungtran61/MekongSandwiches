import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MENU_ITEM_DATA } from './menu-item-data';
import { Observable } from 'rxjs';
import { MenuItem, BasketItem } from './menu';
import { MenuItemOptionsComponent } from './menu-item-options.component';
import { ModalDataService } from '../shared/modal-data.service';
import { BasketService } from './basket.service';

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

  constructor(private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private basketService: BasketService) { }

  getMenuItems(): void {
    this.menuItems1 = MENU_ITEM_DATA.filter(item => item.id < 8);
    this.menuItems2 = MENU_ITEM_DATA.filter(item => item.id > 7);
  }

  ngOnInit() {
    this.getMenuItems();
  }

  orderItem(menuItem: MenuItem) {
    this.basketItem = Object.assign(new BasketItem(), menuItem);
    //this.basketItems.push(basketItem);    
    //localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));      
    this.basketService.sendMessage(this.basketItem);
  }

  clearMessage(): void {
    // clear message
    this.basketService.clearMessage();
  }
}
