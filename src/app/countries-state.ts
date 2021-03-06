import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { CountriesService } from './countries.service';
import { Observable } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Country } from './country';
import { HttpResponse } from '@angular/common/http';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';

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

export class UpdateCountry {
  static readonly type = '[Countries] Update a country';
  constructor(
    public alpha2Code: string,
    public newValue: { [key: string]: any }
  ) {
  }
}

@State<CountriesStateModel>({
  name: 'countries',
  defaults: {
    countries: {},
    alpha2Codes: []
  }
})
@Injectable()
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
  ): Observable<any> {
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
    { getState, patchState, setState }: StateContext<CountriesStateModel>,
    { id }: GetCountryById
  ): Observable<any> {
    const countries = getState().countries;

    if (!!countries && !!countries[id]) {
      setState(
        patch({
          countries: patch({
            [id]: patch({
              isFetchedFromState: true
            })
          })
        })
      );
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

  @Action(UpdateCountry)
  updateCountry(
    { getState, setState, dispatch }: StateContext<CountriesStateModel>,
    { alpha2Code, newValue }: UpdateCountry
  ): Observable<any> {

    return dispatch(new GetCountryById(alpha2Code)).pipe(
      map(() => {
        return { ...getState().countries[alpha2Code] };
      }),
      map((country: Country) => {
        const [key, value] = Object.entries(newValue)[0];
        country[key] = value;
        return country;
      }),
      mergeMap((country: Country) => this.countriesService.updateCountry(country)),
      tap(({ body }: HttpResponse<Country>) => {
        setState(
          patch({
            countries: patch({
              [body.alpha2Code]: body
            })
          })
        );
      })
    );

  }
}
