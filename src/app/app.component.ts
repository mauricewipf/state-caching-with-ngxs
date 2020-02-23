import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CountriesState, GetCountryCodes, GetCountryById, UpdateCountry } from './countries-state';
import { Country } from './country';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countries$: Observable<Country[]>;
  countryCodes$: Observable<string[]>;
  latestFetchedCountry$: Observable<Country>;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new GetCountryCodes());
  }

  ngOnInit() {
    this.countries$ = this.store.select<Country[]>(CountriesState.getCountries());
    this.countryCodes$ = this.store.select(CountriesState.getCountryCodes());
  }

  countryCodeClicked(alpha2Code: string) {
    this.store.dispatch(new GetCountryById(alpha2Code));
    this.latestFetchedCountry$ = this.store.select(CountriesState.getCountryById(alpha2Code));
  }

  updateCountry(country: Country) {
    this.store.dispatch(new UpdateCountry(country.alpha2Code, { population: 100 }));
  }

}
