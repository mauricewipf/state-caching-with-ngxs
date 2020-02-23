import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFetchedCountryComponent } from './latest-fetched-country.component';

describe('LatestFetchedCountryComponent', () => {
  let component: LatestFetchedCountryComponent;
  let fixture: ComponentFixture<LatestFetchedCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestFetchedCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestFetchedCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
