import { Component, Input } from '@angular/core';
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
