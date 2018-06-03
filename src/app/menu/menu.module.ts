import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuItemOptionsComponent } from './menu-item-options.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot() 
  ],
  declarations: [MenuItemOptionsComponent],
  providers: [],
  entryComponents: [ MenuItemOptionsComponent ]
})
export class MenuModule { }
