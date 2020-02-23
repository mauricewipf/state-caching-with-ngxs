import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  static readonly URL = 'https://restcountries.eu/rest/v2';

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${CountriesService.URL}`);
  }

  getCountryCodes(): Observable<any> {
    return this.http.get(`${CountriesService.URL}/all?fields=alpha2Code`);
  }

  getCountryById(alpha2Code: string): Observable<Country> {
    return this.http.get<Country>(`${CountriesService.URL}/alpha/${alpha2Code}`);
  }

  updateCountry(country: Country): Observable<any> {

    const res = new HttpResponse({
      status: 200,
      body: country
    });
    return of(res);
  }
}
