export class MenuItem {
    id: number = 0;
    name: string = "";
    description: string = "";
    price: number = 4.35;    
  }

export interface IMenuItem {
    id: number;
    name: string;    
    description: string;
    price: number;    
}  

export class BasketItem
{
    id: number = 0;
    name: string = "";    
    price: number = 4.35;    
    qty: number = 0; 
    instructions: string = '';       
}

export class ItemOption {
    option: string = "";
    item: string = "";  
    price: number = 0.00;     
  }