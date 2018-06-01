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
  arrOptions = ['No','Extra','Less','Add','On The Side'];
selectedOption: string = '';
selectedItem: string = '';
selectedOptions = []; 
  menuItemOrder: MenuItem;

  ngOnInit() {
    this.menuItemOrder = this.modalDataService.data;
    console.log(this.menuItemOrder);
  }

  selectOption(option: string)
  {
    this.selectedOption = option;
    console.log(option);    
  }

  addOption(item: string)
  {    
    console.log(item);
    this.selectedItem = item;
    if (this.selectedOption != '')
      this.selectedOptions.push(this.selectedOption + ':' + this.selectedItem);
  }
}
