import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { GetProducts, ProductsState, GetProductById } from '../products-state';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products: Product[];

  constructor() {
  }

}
