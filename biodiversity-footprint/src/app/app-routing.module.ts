import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorPageComponent } from './components/calculator-page/calculator-page.component';
import { MethodologyPageComponent } from './components/methodology-page/methodology-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   {path: 'home', component: HomePageComponent},
  {path: 'calculator', component: CalculatorPageComponent},
  {path: 'methodology', component: MethodologyPageComponent},
  {path: 'about', component: AboutPageComponent} 
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
    RouterOutlet
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
