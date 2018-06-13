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

export class BasketItem {
    id: number = 0;
    name: string = "";
    price: number = 4.35;
    qty: number = 0;
    instructions: ItemOption[];
}

export class ItemOption {
    option: string = "";
    item: string = "";
    price: number = 0.00;
}

export class Order {
    id: number;
    name: string;
    phone: string;
    pickUpTime: Date;
    pickUpDate: Date;
    orderItems: OrderItem[];
}

export class OrderItem {
    id: number = 0;
    name: string = "";
    price: number = 4.35;
    qty: number = 0;
    instructions: ItemOption[];
}

export interface APIResponse
{
    ResponseCode: number;
    ResponseText: string;
}

export enum OrderStatus
{
    'New',
    'Sent to Kitchen',
    'Processed'
}