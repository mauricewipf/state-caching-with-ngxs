import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-latest-fetched-country',
  templateUrl: './latest-fetched-country.component.html',
  styleUrls: ['./latest-fetched-country.component.css']
})
export class LatestFetchedCountryComponent {
  @Input() country: Product;

  constructor() { }

}
