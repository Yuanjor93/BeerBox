import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerService } from './beer.service';
import { BeerCategoriesComponent } from './components/beer-categories/beer-categories.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';


const appRoutes: Routes = [
  {
    path: 'beerCategories',
    component: BeerCategoriesComponent,
  },
  {
    path: 'beerDetails',
    component: BeerDetailsComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    BeerCategoriesComponent,
    BeerDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
