export class Country {
  constructor(
    public alpha2Code: string,
    public name: string,
    public region: string,
    public population: number,
    public isFetchedFromState: boolean,
  ) { }
}
