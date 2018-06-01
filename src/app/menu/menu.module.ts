import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuItemOptionsComponent } from './menu-item-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MenuItemOptionsComponent],
  providers: [],
  entryComponents: [ MenuItemOptionsComponent ]
})
export class MenuModule { }
