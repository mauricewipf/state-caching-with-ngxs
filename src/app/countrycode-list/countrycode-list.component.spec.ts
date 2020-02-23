import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrycodeListComponent } from './countrycode-list.component';

describe('CountrycodeListComponent', () => {
  let component: CountrycodeListComponent;
  let fixture: ComponentFixture<CountrycodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrycodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrycodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
