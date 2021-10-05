import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Dynamic item page route
  { path: '', redirectTo: 'adminlogin', pathMatch: 'full'},
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'home', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
