import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MenuItemOptionsComponent } from './menu-item-options.component';
import { MenuComponent } from './menu.component';
import { MainComponent } from './main.component';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';
import { CheckoutComponent } from './checkout.component';
import { CustomerInfoComponent } from './customer-info.component';
import { MenuService } from './menu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [MenuComponent, BasketComponent],
  declarations: [MenuItemOptionsComponent, MenuComponent, BasketComponent, CheckoutComponent, CustomerInfoComponent, MainComponent],
  providers: [BasketService, MenuService],
  entryComponents: [ MenuItemOptionsComponent ]
})
export class MenuModule { }
