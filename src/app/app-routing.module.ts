import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './menu/main.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ContactComponent } from './contact.component';
import { CheckoutComponent } from './menu/checkout.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'main', 
    component: MainComponent
  },  
  { 
    path: 'checkout', 
    component: CheckoutComponent
  },  
  { 
    path: 'contact', 
    component: ContactComponent
  },  
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
