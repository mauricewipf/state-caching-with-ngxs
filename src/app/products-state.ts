import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product';

export class ProductsStateModel {
}

export class GetProducts {
  static readonly type = '[Products] Get products';
  constructor() {
  }
}

export class GetProductById {
  static readonly type = '[Products] Get product by ID';
  constructor(public id: string) {
  }
}

@State<Product[]>({
  name: 'products',
  defaults: []
})
export class ProductsState {
  constructor(private productsService: ProductsService) { }

  static getProducts() {
    return createSelector(
      [ProductsState],
      (state: ProductsStateModel) => Object.values(state)
    );
  }

  static getProductById(id: string) {
    return createSelector(
      [ProductsState],
      (state: ProductsStateModel) => state[id]
    );
  }

  @Action(GetProducts)
  getProducts(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { }: GetProducts
  ): Observable<Product[]> {
    const products = getState();

    if (!!products[0]) {
      return;
    }

    return this.productsService.getProducts().pipe(
      tap((responseProducts: Product[]) => {
        responseProducts.forEach((product: Product) => patchState({ [product.alpha2Code]: product }));
      })
    );
  }

  @Action(GetProductById)
  getProductById(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { id }: GetProductById
  ): Observable<Product> {
    const products = getState();

    if (!!products[id]) {
      return;
    }

    return this.productsService.getProductById(id).pipe(
      tap((product: Product) => {
        patchState({ [id]: product });
      })
    );
  }
}
