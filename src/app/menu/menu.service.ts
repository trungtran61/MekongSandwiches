import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMenuItem, MenuItem } from './menu';
import { MENU_ITEM_DATA } from './menu-item-data';

@Injectable()
export class MenuService {

  constructor() { }

  getMenuItems(): MenuItem[] {
    return MENU_ITEM_DATA;
}
}
