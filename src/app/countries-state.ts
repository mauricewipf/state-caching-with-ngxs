import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { CountriesService } from './countries.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from './country';

export class CountriesStateModel {
  countries: { [key: string]: Country };
  alpha2Codes: string[];
}

export class GetCountries {
  static readonly type = '[Countries] Get countries';
  constructor() {
  }
}

export class GetCountryById {
  static readonly type = '[Countries] Get country by ID';
  constructor(public id: string) {
  }
}

export class GetCountryCodes {
  static readonly type = '[Countries] Get country codes';
  constructor() {
  }
}

@State<CountriesStateModel>({
  name: 'countries',
  defaults: {
    countries: {},
    alpha2Codes: []
  }
})
export class CountriesState {
  constructor(private countriesService: CountriesService) { }

  static getCountries() {
    return createSelector(
      [CountriesState],
      (state: CountriesStateModel) => Object.values(state.countries)
    );
  }

  static getCountryById(id: string) {
    return createSelector(
      [CountriesState],
      (state: CountriesStateModel) => state.countries[id]
    );
  }

  static getCountryCodes() {
    return createSelector(
      [CountriesState],
      (state: CountriesStateModel) => state.alpha2Codes
    );
  }

  @Action(GetCountries)
  getCountries(
    { getState, patchState }: StateContext<CountriesStateModel>,
    { }: GetCountries
  ): Observable<Country[]> {
    const countries = getState().countries;

    if (!!countries && Object.entries(countries).length > 0 && countries.constructor === Object) {
      return;
    }

    return this.countriesService.getCountries().pipe(
      tap((res: Country[]) => {
        const newState = {
          countries: {}
        };
        res.forEach((country: Country) => {
          newState.countries[country.alpha2Code] = country;
        });
        patchState(newState);
      })
    );
  }

  @Action(GetCountryById)
  getCountryById(
    { getState, patchState }: StateContext<CountriesStateModel>,
    { id }: GetCountryById
  ): Observable<Country> {
    const countries = getState().countries;

    if (!!countries && !!countries[id]) {
      patchState({
        countries: {
          ...countries,
          [id]: {
            ...countries[id],
            isFetchedFromState: true
          }
        }
      });
      return;
    }

    return this.countriesService.getCountryById(id).pipe(
      tap((country: Country) => {
        patchState({
          countries: {
            ...countries,
            [id]: {
              ...country,
              isFetchedFromState: false
            },
          }
        });
      })
    );
  }

  @Action(GetCountryCodes)
  getCountryCodes(
    { getState, patchState }: StateContext<CountriesStateModel>,
    { }: GetCountryCodes
  ) {
    const alpha2Codes = getState().alpha2Codes;

    if (!!alpha2Codes && alpha2Codes.length > 0) {
      return;
    }

    return this.countriesService.getCountryCodes().pipe(
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
