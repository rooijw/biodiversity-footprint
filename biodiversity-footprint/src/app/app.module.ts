import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorPageComponent } from './components/calculator-page/calculator-page.component';
import { MethodologyPageComponent } from './components/methodology-page/methodology-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ItemComponent } from './items/item/item.component';
import { GraphsComponent } from './graphs/graphs.component'; 
import { FormsModule } from '@angular/forms';
import { ScenarioComponent} from './scenario/scenario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransportItemComponent } from './items/transport-item/transport-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CalculatorPageComponent,
    MethodologyPageComponent,
    AboutPageComponent,
    ItemComponent,
    GraphsComponent,
    ScenarioComponent,
    TransportItemComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
