import { Component, Input } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-latest-fetched-country',
  templateUrl: './latest-fetched-country.component.html',
  styleUrls: ['./latest-fetched-country.component.css']
})
export class LatestFetchedCountryComponent {
  @Input() country: Country;

  constructor() { }

}
