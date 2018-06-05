import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ContactComponent } from './contact.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuItemOptionsComponent } from './menu/menu-item-options.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ModalDataService } from './shared/modal-data.service';
import { MenuModule } from './menu/menu.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MainComponent } from './menu/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContactComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MenuModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot() 
  ],
  providers: [BsModalService, ModalDataService],  
  bootstrap: [AppComponent]  
})
export class AppModule { }
