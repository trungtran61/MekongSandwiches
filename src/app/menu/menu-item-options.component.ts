import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalDataService } from '../shared/modal-data.service';
import { BasketItem, ItemOption } from './menu';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-menu-item-options',
  templateUrl: './menu-item-options.component.html',
  styleUrls: ['./menu-item-options.component.css']
})
export class MenuItemOptionsComponent implements OnInit {

  constructor(private modalDataService: ModalDataService,
    private bsModalRef: BsModalRef, private basketService: CartService,
    private router: Router) { }

  options = ['No', 'Extra', 'Less', 'Add', 'On The Side'];
  items = ['Pickle', 'Jalapeno', 'Cilantro', 'Mayonaise', 'Onion',
    'Cucumber', 'Salt & Pepper', 'Soy Sauce', 'Pate', 'Head Cheese',
    'Meat', 'Jambon', 'Pork Belly', 'Pork Roll', 'Egg',
    'Veggie'];
  enabledOptions = ['No:Pickle', 'No:Jalapeno', 'No:Cilantro',
    'No:Mayonaise', 'No:Onion', 'No:Cucumber', 'No:Salt & Pepper',
    'No:Soy Sauce', 'No:Head Cheese', 'No:Pate',
    'No:Meat', 'No:Jambon', 'No:Pork Belly', 'No:Pork Roll',
    'No:Veggie',
    'Extra:Pickle', 'Extra:Jalapeno', 'Extra:Cilantro',
    'Extra:Mayonaise', 'Extra:Onion', 'Extra:Cucumber', 'Extra:Salt & Pepper',
    'Extra:Soy Sauce', 'Extra:Pate',
    'Extra:Meat', 'Extra:Jambon', 'Extra:Pork Belly', 'Extra:Pork Roll',
    'Extra:Egg', 'Extra:Veggie',
    'Less:Pickle', 'Less:Jalapeno', 'Less:Cilantro',
    'Less:Mayonaise', 'Less:Onion', 'Less:Cucumber', 'Less:Salt & Pepper',
    'Less:Soy Sauce', 'Less:Head Cheese', 'Less:Pate',
    'Less:Meat', 'Less:Jambon', 'Less:Pork Belly', 'Less:Pork Roll',
    'Less:Veggie',
    'Add:Head Cheese', 'Add:Meat', 'Add:Jambon', 'Add:Pork Belly', 'Add:Pork Roll', 'Add:Egg',
    'On The Side:Egg', 'On The Side:Veggie'];

  selectedOption: string = '';
  selectedItem: string = '';
  selectedOptions: ItemOption[] = [];
  basketItem: BasketItem;
  itemPrice = [];
  isActiveOption = [];
  meat = ['Head Cheese', 'Meat', 'Jambon', 'Pork Belly', 'Pork Roll', 'Egg']
  
  ngOnInit() {
    this.basketItem = this.modalDataService.data;

    if (this.basketItem.instructions)
      this.selectedOptions = this.basketItem.instructions;

    for (let i in this.isActiveOption) {
      this.isActiveOption.push(false);
    }

    for (let i in this.items) {
      if (this.meat.includes(this.items[i]))
        this.itemPrice.push('1.00');
      else if (this.items[i] == 'Pate') {
        this.itemPrice.push('0.35');
      }
      else
        this.itemPrice.push(0);
    }
  }

  selectOption(option: string, index) {

    for (let i in this.isActiveOption) {
      this.isActiveOption[i] = false;
    }

    this.isActiveOption[index] = true;
    this.selectedOption = option;    
  }

  selectOptionItem(item: string, index) {
    this.selectedItem = item;
    let selectedOptionItem = this.selectedOption + ':' + this.selectedItem;

    if (this.enabledOptions.includes(selectedOptionItem)) {
      //let toolTip = this.toolTip[index] == '' ? '' : '(' + this.toolTip[index] + ')';
      //if (this.selectedOption == 'No') {
//        toolTip = '';
  //    }
      if (this.selectedOption != '') {
        let itemOption: ItemOption = new ItemOption();
        itemOption.option = this.selectedOption;
        itemOption.item = this.selectedItem;
        if (this.selectedOption == 'No')
        {
          itemOption.price = 0;
        }
        else{
          itemOption.price = this.itemPrice[index];
          this.basketItem.price +=  +itemOption.price;          
        }
        this.selectedOptions.push(itemOption);
      }
    }
  }

  removeSelectedOptionItem(index: number) {
    this.basketItem.price -=  +this.selectedOptions[index].price;    
    this.selectedOptions.splice(index, 1);    
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveOptions() {
    this.basketItem.instructions = this.selectedOptions;
    this.basketService.sendInstructions(this.basketItem); 
    this.bsModalRef.hide();
    this.router.navigate(['/main']);
  }
}
