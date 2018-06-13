import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { BasketItem, MenuItem } from './menu';
import { ModalDataService } from '../shared/modal-data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MenuItemOptionsComponent } from './menu-item-options.component';
import { BasketService } from './basket.service';
import { Subscription } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  basketItems: BasketItem[] = [];
  basketTotal: number = 0;
  basketTotals: string = '';
  message: string;

  constructor(private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private basketService: BasketService,   
    private router: Router) {

    this.subscription = this.basketService.getMessage().subscribe(basketItem => {
      //console.log(basketItem);
      this.addToBasket(basketItem.basketItem);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log(this.router.url);
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

  updateQty(index: number) {
    if (this.basketItems[index].qty == 0) {
      this.removeItem(index);
    }
    else {
      this.calculateTotals();
    }
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
  }

  addToBasket(basketItem: BasketItem) {
    //let basketItem: BasketItem = Object.assign(new BasketItem(), menuItem);
    console.log(basketItem);
    this.basketItems.push(basketItem);
    localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));
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
