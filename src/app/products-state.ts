import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product';

export class ProductsStateModel {
  products: { [key: string]: Product };
  alpha2Codes: string[];
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

export class GetCountryCodes {
  static readonly type = '[Products] Get country codes';
  constructor() {
  }
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: {},
    alpha2Codes: []
  }
})
export class ProductsState {
  constructor(private productsService: ProductsService) { }

  static getProducts() {
    return createSelector(
      [ProductsState],
      (state: ProductsStateModel) => Object.values(state.products)
    );
  }

  static getProductById(id: string) {
    return createSelector(
      [ProductsState],
      (state: ProductsStateModel) => state.products[id]
    );
  }

  static getCountryCodes() {
    return createSelector(
      [ProductsState],
      (state: ProductsStateModel) => state.alpha2Codes
    );
  }

  @Action(GetProducts)
  getProducts(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { }: GetProducts
  ): Observable<Product[]> {
    const products = getState().products;

    if (!!products && Object.entries(products).length > 0 && products.constructor === Object) {
      return;
    }

    return this.productsService.getProducts().pipe(
      tap((responseProducts: Product[]) => {
        const newState = {
          products: {}
        };
        responseProducts.forEach((product: Product) => {
          newState.products[product.alpha2Code] = product;
        });
        patchState(newState);
      })
    );
  }

  @Action(GetProductById)
  getProductById(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { id }: GetProductById
  ): Observable<Product> {
    const products = getState().products;

    if (!!products && !!products[id]) {
      return;
    }

    return this.productsService.getProductById(id).pipe(
      tap((product: Product) => {
        patchState({ products: { [id]: product } });
      })
    );
  }

  @Action(GetCountryCodes)
  getCountryCodes(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { }: GetCountryCodes
  ) {
    const alpha2Codes = getState().alpha2Codes;

    if (!!alpha2Codes && alpha2Codes.length > 0) {
      return;
    }

    return this.productsService.getCountryCodes().pipe(
      tap((res: { alpha2Code: string }[]) => {
        const newState = {
          alpha2Codes: []
        };
        res.forEach(({ alpha2Code }) => newState.alpha2Codes.push(alpha2Code));
        patchState(newState);
      })
    );
  }

}
