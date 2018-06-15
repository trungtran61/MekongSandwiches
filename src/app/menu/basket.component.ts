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
  instructionsSubscription : Subscription;
  basketItems: BasketItem[] = [];
  basketTotal: number = 0;
  basketTotals: string = '';
  message: string;

  constructor(private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private basketService: BasketService,   
    private router: Router) {

    // subscribe to send event from Menu component -- occurs when menu item is selected to be added to basket 
    this.subscription = this.basketService.getMenuItem().subscribe(item => {     
      console.log(item);
      this.addToBasket(item.basketItem);
    });

    // subscribe to send event from MenuItemOtions component -- occurs when instructions are updated for a basket item
    this.instructionsSubscription = this.basketService.getInstructions().subscribe(basketItem => { 
      console.log(basketItem.item);
      this.basketItems[basketItem.index] = basketItem; 
      localStorage.setItem("MekongSandwichesBasket", JSON.stringify(this.basketItems));        
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
