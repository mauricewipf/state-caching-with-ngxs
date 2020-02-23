import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static readonly URL = 'https://restcountries.eu/rest/v2';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ProductsService.URL}`);
  }

  getCountryCodes(): Observable<any> {
    return this.http.get(`${ProductsService.URL}/all?fields=alpha2Code`);
  }

  getProductById(alpha2Code: string): Observable<Product> {
    return this.http.get<Product>(`${ProductsService.URL}/alpha/${alpha2Code}`);
  }
}
