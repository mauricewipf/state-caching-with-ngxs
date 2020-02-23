import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetProducts, ProductsState } from './products-state';
import { Product } from './product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'state-caching';
  products$: Observable<Product[]>;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new GetProducts());
  }

  ngOnInit() {
    this.products$ = this.store.select(ProductsState.getProducts());
  }

}
