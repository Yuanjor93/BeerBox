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
public mappedBeerInfomation: BeerInfo [] = [];
public filteredBeerInfomation: BeerInfo [] = [];
public filteredBeerByCategory: BeerInfo [] = [];
public showBeerDetails: BeerInfo [] = [];




  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
  this.beerService.getBeerCategories()
  .subscribe(data => this.beerCats = data);
 this.beerService.getBeerInfo().subscribe(data => this.getBeerInfos = data);
    this.MapBeerArray();
console.log(this.mappedBeerInfomation);

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
     this.mappedBeerInfomation = this.getBeerInfos;
  }

  onSelectBeerByCategory( selectedValue: string ) {
  console.log(selectedValue);
  // clears out the array for additional selection
  if ( this.filteredBeerByCategory.length !== 0) {
    this.filteredBeerByCategory = [];
  }
  let i = 0;
    for ( const beerCategory of this.mappedBeerInfomation) {
      i++;
      if ( beerCategory.category === selectedValue) {
        console.log(beerCategory);
        console.log(i);
      this.filteredBeerByCategory.push({
      url: beerCategory.url,
      name: beerCategory.name,
      ibu: beerCategory.ibu,
      calories: beerCategory.calories,
      abv: beerCategory.abv,
      style: beerCategory.style,
      brewery_location: beerCategory.brewery_location,
      created_on: beerCategory.created_on,
      category: beerCategory.category,
    });
      }
    }
  }

  SearchProduct(name: string) {
    console.log('debuggin name');
    console.log(name);
    const obj = this.filteredBeerByCategory.filter(m => m.name === name);
    this.showBeerDetails = obj;
    console.log('beerDetails based on user selection');
    console.log(this.showBeerDetails);
   // return this.showBeerDetails;
}

  searchBeer(beerName: string) {
    this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/beers/search/?q=' + beerName)
    .subscribe((data: BeerInfo[]) => {
       this.searchBeerInfos = data;
    });
    console.log(this.searchBeerInfos);
  }

  onGetBeerCategories() {
    this.beerService.getBeerCategories()
    .subscribe(data => this.beerCats = data);
    console.log(this.beerCats);
  }

  onGetBeerInfo() {
 this.beerService.getBeerInfo()
    .subscribe(data => this.getBeerInfos = data);
  }

  onAddBeerInfo(beerName: string, beerAbv: string, beerIBU: string, beerCalories: string, beerStyle: string, beerCategory: string) {
    this.getBeerInfos.push({
      url: '',
      name: beerName,
      ibu: beerIBU,
      calories: beerCalories,
      abv: beerAbv,
      style: beerStyle,
      brewery_location: '',
      created_on: '',
      category: beerCategory,
    });
  }

  // unused

  onGetBeerCategoryById(id: string) {
    this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/category/' + id)
    .subscribe((data: BeerInfo[]) => {
       this.searchBeerInfos = data;
    });
    console.log(this.searchBeerInfos);
  }

  onGetBeerById(id: string) {
    this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/beer/' + id )
    .subscribe((data: BeerInfo[]) => {
       this.searchBeerInfos = data;
    });
    console.log(this.searchBeerInfos);
  }
}
