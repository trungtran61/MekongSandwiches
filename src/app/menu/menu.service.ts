import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import { IMenuItem, MenuItem, Order, OrderItem, OrderStatus } from './menu';
import { MENU_ITEM_DATA } from './menu-item-data';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class MenuService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  
  getMenuItems(): MenuItem[] {
    return MENU_ITEM_DATA;
  }

  addOrder(order: Order) {
    console.log(order);   
  
    return this.http.post(this.apiUrl + 'AddOrder', order, {
      headers: new HttpHeaders({
          'Accept':'application/json',
          'Authorization': 'my-auth-token'
      })
  });
  }

  getOrders(orderStatus: OrderStatus ) {    
  
    console.log(this.apiUrl + 'GetOrders/' + orderStatus.toString());
    return this.http.get(this.apiUrl + 'GetOrders/' + orderStatus.toString(), {
      headers: new HttpHeaders({
          'Accept':'application/json',
          'Authorization': 'my-auth-token'
      })
  });
   
  }
}
