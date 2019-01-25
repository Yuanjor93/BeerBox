import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, filter, scan } from 'rxjs/operators';

import { Categories } from './beer/categories.model';
import { BeerInfo } from './beer/beer.model';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class BeerService {
    constructor(private httpClient: HttpClient) { }

    getBeerCategories(): Observable<Categories[]> {
        // automated extract the body of the response
        return this.httpClient.get<Categories[]>('http://apichallenge.canpango.com/categories/');
    }

    getBeerInfo(): Observable<BeerInfo[]> {
        // automated extract the body of the response
        return this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/beers/');
    }


    searchBeer(beerName: string): Observable<BeerInfo[]> {
        return this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/beers/search/?q=' + beerName);
    }


    getBeerByID(beerID: string): Observable<any> {
        return this.httpClient.get<BeerInfo[]>('http://apichallenge.canpango.com/beers/' + beerID + '/');
    }

    getCategoryByID(categoryID: string): Observable<any> {
        return this.httpClient.get<Categories[]>('http://apichallenge.canpango.com/category/' + categoryID + '/');
    }

}
