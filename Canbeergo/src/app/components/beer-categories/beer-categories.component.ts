import { Component, OnInit, Host } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BeerInfo } from 'src/app/beer/beer.model';
import { BeerService } from 'src/app/beer.service';
import { AppComponent } from 'src/app/app.component';
import { Categories } from 'src/app/beer/categories.model';


@Component({
  selector: 'app-beer-categories',
  templateUrl: './beer-categories.component.html',
  styleUrls: ['./beer-categories.component.css']
})
export class BeerCategoriesComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private beerService: BeerService,
    private parent: AppComponent) {
  }

  public beerCats: Categories[] = [];
  public searchBeerInfos: BeerInfo[] = [];
  public getBeerInfos: BeerInfo[] = [];
  public filteredBeerInfomation: BeerInfo[] = [];
  // beer-Category
  public filteredBeerByCategory: BeerInfo[] = [];
  public mappedBeerInfomation: BeerInfo[] = [];
  public showBeerDetails: BeerInfo[] = [];


  ngOnInit() {
    this.beerService.getBeerCategories()
      .subscribe(data => this.beerCats = data,
         (error) => console.log(error));

    this.beerService.getBeerInfo()
    .subscribe(data => this.getBeerInfos = data,
      (error) => console.log(error));
  }

  // Replace Beer array infomation with direct Category names instead of URL reference
  MapBeerArray() {
    for (const beerInfo of this.getBeerInfos) {
      for (const beerCat of this.beerCats) {
        if (beerInfo.category === beerCat.url) {
          beerInfo.category = beerCat.name;
        }
      }
    }
    this.mappedBeerInfomation = this.getBeerInfos;
  }

  onSelectBeerByCategory(selectedValue: string) {
    this.MapBeerArray();
    // clears out the array for additional selection
    if (this.filteredBeerByCategory.length !== 0) {
      this.filteredBeerByCategory = [];
    }
    for (const beerCategory of this.mappedBeerInfomation) {
      if (beerCategory.category === selectedValue) {
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

  // allows to search for beer based on drop down menu
  SearchProduct(name: string) {
    const obj = this.filteredBeerByCategory.filter(m => m.name === name);
    this.showBeerDetails = obj;
  }
}
