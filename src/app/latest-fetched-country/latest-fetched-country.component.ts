import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../country';

@Component({
  selector: 'app-latest-fetched-country',
  templateUrl: './latest-fetched-country.component.html',
  styleUrls: ['./latest-fetched-country.component.css']
})
export class LatestFetchedCountryComponent {
  @Input() country: Country;
  @Output() updateCountry: EventEmitter<Country> = new EventEmitter();

  constructor() { }

  onUpdateCountry(event: Event) {
    this.updateCountry.emit(this.country);
  }
}
