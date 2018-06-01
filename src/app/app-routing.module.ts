import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'menu', 
    component: MenuComponent
  },
  { 
    path: 'contact', 
    component: ContactComponent
  },  
  {
    path: '', redirectTo: 'menu', pathMatch: 'full'
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
