import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Country } from '../country';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent {
  @Input() countries$: Observable<Country[]>;

  constructor() {
  }

}
