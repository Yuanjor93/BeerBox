import { Component, OnInit,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BeerService } from 'src/app/beer.service';
import { AppComponent } from 'src/app/app.component';
import { Categories } from 'src/app/beer/categories.model';
import { BeerInfo } from 'src/app/beer/beer.model';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  constructor(
    private beerService: BeerService,
    private appComponent: AppComponent) {
  }

  public searchBeerInfos: BeerInfo[] = [];
  public filteredBeerInfomation: BeerInfo[] = [];
  public beerCats: Categories[] = [];
  private displayHiddenSearch = false;

  private beerIdDatas: any[] = [];
  private categoryIdDatas: Categories[] = [];

  ngOnInit() {
    this.beerService.getBeerCategories()
      .subscribe(data => this.beerCats = data);
  }


  searchBeer(beerName: string) {
    console.log(beerName);
    if (beerName === null || beerName === '') {
      throwError('need to type in a name');
    } else {
      this.beerService.searchBeer(beerName)
        .subscribe(data => {
          this.searchBeerInfos = data;
        });
    }
    console.log(this.searchBeerInfos);
  }

  onAddBeerInfo(beerName: string, beerAbv: string, beerIBU: string, beerCalories: string, beerStyle: string, beerCategory: string) {

    this.appComponent.mappedBeerInfomation.push({
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


  showHiddenSearchOption() {
    this.displayHiddenSearch = true;
  }


  onSearchBeerById(id: string) {
    this.beerService.getBeerByID(id)
      .subscribe(
        (data => {
          this.beerIdDatas[0] = data;
        }), (error) => console.log(error)
      );
  }

  onSearchBeerCategoryByID(id: string) {
    this.beerService.getCategoryByID(id).subscribe((
      data => {
        this.categoryIdDatas[0] = data;
      }), (error) => console.log(error)
    );
  }

}
