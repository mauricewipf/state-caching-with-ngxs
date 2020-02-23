import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { GetCountries, CountriesState, GetCountryById } from '../countries-state';
import { Country } from '../country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent {
  @Input() countries: Country[];

  constructor() {
  }

} 
