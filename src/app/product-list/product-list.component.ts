import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { GetProducts, ProductsState, GetProductById } from '../products-state';
import { Store } from '@ngxs/store';
import { takeUntil, switchMap, tap, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new GetProducts());
  }

  ngOnInit() {
    this.products$ = this.store.select(ProductsState.getProducts());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
