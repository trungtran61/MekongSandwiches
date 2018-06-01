import { Component, OnInit } from '@angular/core';
import { ModalDataService } from '../shared/modal-data.service';
import { MenuItem } from './menu';

@Component({
  selector: 'app-menu-item-options',
  templateUrl: './menu-item-options.component.html',
  styleUrls: ['./menu-item-options.component.css']
})
export class MenuItemOptionsComponent implements OnInit {

  constructor(private modalDataService: ModalDataService) { }

  menuItemOrder: MenuItem;

  ngOnInit() {
    this.menuItemOrder = this.modalDataService.data;
    console.log(this.menuItemOrder);
  }

}
