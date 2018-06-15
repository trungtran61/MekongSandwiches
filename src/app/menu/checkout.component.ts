import { Component, OnInit } from '@angular/core';
import { BasketItem, Order, OrderItem, ItemOption } from './menu';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: MenuService) { }

  name: string = '';
  phone: string = '';
  infoMessage: string = '';
  errorMessage: string = '';
  saveOrder: boolean = true;
  pickUpDate: Date = new Date();
  pickUpTime: Date = new Date(new Date().getTime() + 10 * 60000);  //default pickup time is 10 minutes from now

  ngOnInit() {
    //this.pickUpTime = new Date(new Date().getTime() + 5*60000);
  }

  submitOrder() {
    let orderItems: OrderItem[] = JSON.parse(localStorage.getItem("MekongSandwichesBasket"));
    console.log(orderItems);
    let order: Order = new Order();
    //order.id = 5;
    order.name = this.name;
    order.phone = this.phone;
    order.pickUpTime = this.pickUpTime.toTimeString();
    console.log(order.pickUpTime);
    order.pickUpDate = this.pickUpDate;
    order.orderItems = [];

    orderItems.forEach(function (orderItem) {
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

    console.log(order);

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
    if (!this.saveOrder)
      localStorage.removeItem("MekongSandwichesBasket");
  }
}
