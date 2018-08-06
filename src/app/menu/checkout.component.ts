import { Component, OnInit } from '@angular/core';
import { BasketItem, Order, OrderItem, ItemOption, ContactInfo } from './menu';
import { MenuService } from './menu.service';
import { CartService } from './cart.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: MenuService,
    private cartService: CartService) {

    this.cartItems$ = this
      .cartService
      .getItems();

    this.cartItems$.subscribe(_ => this.cartItems = _);
  }

  name: string = '';
  phone: string = '';
  infoMessage: string = '';
  errorMessage: string = '';
  pickUpDate: Date = new Date();
  pickUpTime: Date = new Date(new Date().getTime() + 10 * 60000);  //default pickup time is 10 minutes from now
  cartItems$: Observable<BasketItem[]> = of([]);
  cartItems: BasketItem[] = [];

  ngOnInit() {
    let contactInfo: ContactInfo = this.cartService.getContactInfo();

    if (contactInfo) {
      this.name = contactInfo.name;
      this.phone = contactInfo.phone;
    }
  }

  submitOrder() {
    //let orderItems: OrderItem[] = JSON.parse(localStorage.getItem("MekongSandwichesBasket"));

    console.log(this.cartItems);
    let order: Order = new Order();
    //order.id = 5;
    order.name = this.name;
    order.phone = this.phone;
    order.pickUpTime = this.pickUpTime.toTimeString();
    order.pickUpDate = this.pickUpDate;
    order.orderItems = [];

    this.cartItems.forEach(function (orderItem) {
      let item: OrderItem = new OrderItem();
      item.id = orderItem.id;
      item.name = orderItem.name;
      item.qty = orderItem.qty;
      let instructions: ItemOption[] = [];
      if (orderItem.instructions) {
        orderItem.instructions.forEach(function (instruction) {
          instructions.push(instruction);
        }
        );
        item.instructions = instructions;
      }
      order.orderItems.push(item);
    });

    this.orderService.addOrder(order)
      .subscribe(
        response => {
          console.log(response);
          this.onSaveComplete(response);
        },
        error => {
          this.errorMessage = "We're experiencing technical issue, please place phone order at (480-964-7999). Thanks for your understanding";
        }
      );;
  }

  onSaveComplete(userId): void {
    this.infoMessage = 'Your order has been submitted. Please pick up at your convenience.'
    this.errorMessage = '';

    this.cartService.saveCartToStorage();

    let contactInfo: ContactInfo = new ContactInfo();
    contactInfo.name = this.name;
    contactInfo.phone = this.phone;
    this.cartService.saveContactInfo(contactInfo)
    this.cartService.clearCart();
  }
}
