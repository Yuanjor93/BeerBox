import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BeerService} from './beer.service';
import { Categories } from './beer/categories.model';
import { BeerInfo } from './beer/beer.model';
import { BeerCategoriesComponent } from './components/beer-categories/beer-categories.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpClient: HttpClient,
    private beerService: BeerService) {
  }
  title = 'Canbeergo';

public beerCats: Categories[] = [];
public searchBeerInfos: BeerInfo [] = [];
public getBeerInfos: BeerInfo [] = [];
public filteredBeerInfomation: BeerInfo [] = [];


// beer-Category
public filteredBeerByCategory: BeerInfo [] = [];
public mappedBeerInfomation: BeerInfo [] = [];
public showBeerDetails: BeerInfo [] = [];



  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    // retrieve beer categories -
  this.beerService.getBeerCategories()
  .subscribe(data => this.beerCats = data,
     (error) => console.log(error));

    // retrieve beer detail infomation
 this.beerService.getBeerInfo()
 .subscribe(data => this.getBeerInfos = data,
  (error) => console.log(error));

  this.MapBeerArray();
  }


  // Replace Beer array infomation with direct Category names instead of URL reference
  MapBeerArray() {
    for (  const beerInfo of this.getBeerInfos) {
      for ( const beerCat of this.beerCats) {
        if ( beerInfo.category === beerCat.url) {
       beerInfo.category = beerCat.name;
          }
        }
      }
    return this.mappedBeerInfomation = this.getBeerInfos;
  }

}
