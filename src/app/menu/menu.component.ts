import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MENU_ITEM_DATA } from './menu-item-data';
import { Observable } from 'rxjs/Observable';
import { MenuItem, BasketItem } from './menu';
import { MenuItemOptionsComponent } from './menu-item-options.component';
import { ModalDataService } from '../shared/modal-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems1: MenuItem[];
  menuItems2: MenuItem[];
  basketItems: BasketItem[] = [];
  basketTotal: number = 0;
  basketTotals: string = '';

  constructor(private modalService: BsModalService,
    private modalDataService: ModalDataService) { }

  getMenuItems(): void {
    this.menuItems1 = MENU_ITEM_DATA.filter(item => item.id < 8);
    this.menuItems2 = MENU_ITEM_DATA.filter(item => item.id > 7);
  }

  ngOnInit() {
    this.getMenuItems();
    this.basketItems = JSON.parse(localStorage.getItem("MekongSandwichesBasket"));

    if (!this.basketItems)
      this.basketItems = [];
    else
      this.calculateTotals();
  }

  removeItem(index: number) {
    this.basketItems.splice(index, 1);
    this.calculateTotals();
  }

  updateQty(index: number) {
    if (this.basketItems[index].qty == 0) {
      this.removeItem(index);
    }
    else
    {
      this.calculateTotals();
    }
  }

  orderItem(menuItem: MenuItem) {
    let basketItem: BasketItem = Object.assign(new BasketItem(), menuItem);
    this.basketItems.push(basketItem);
    console.log(this.basketItems);
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
    this.calculateTotals();
  }

  calculateTotals() {
    this.basketTotal = 0;
    this.basketItems.forEach(x => this.basketTotal += x.qty * x.price);
    this.basketTotal += Math.round(this.basketTotal * .08);      // plus tax
    this.basketTotals = this.basketTotal.toFixed(2);
  }

  openBasketItemOptions(menuItem: BasketItem) {
    this.modalDataService.data = menuItem;
    const modal = this.modalService.show(MenuItemOptionsComponent, { 'class': 'modal-dialog-primary modal-lg' });
  }

  formatInstructions(basketItem: BasketItem)
  {
    let instructions: string = '';

    if (basketItem.instructions)
    {
      for(let i = 0; i < basketItem.instructions.length; i++) {
        instructions += basketItem.instructions[i].option + ' ' + basketItem.instructions[i].item +  (i < basketItem.instructions.length -1 ? ', ' : '');
      }      
      return instructions;
    }
    else
      return '';
  }
}
