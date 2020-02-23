import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetProducts, ProductsState, GetCountryCodes } from './products-state';
import { Product } from './product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products$: Observable<Product[]>;
  countryCodes$: Observable<string[]>;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new GetProducts());
    this.store.dispatch(new GetCountryCodes());
  }

  ngOnInit() {
    this.products$ = this.store.select<Product[]>(ProductsState.getProducts());
    this.countryCodes$ = this.store.select(ProductsState.getCountryCodes());
  }

}
