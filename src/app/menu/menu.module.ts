import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuItemOptionsComponent } from './menu-item-options.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MenuComponent } from './menu.component';
import { MainComponent } from './main.component';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot() 
  ],
  exports: [MenuComponent, BasketComponent],
  declarations: [MenuItemOptionsComponent, MenuComponent, BasketComponent],
  providers: [BasketService],
  entryComponents: [ MenuItemOptionsComponent ]
})
export class MenuModule { }
