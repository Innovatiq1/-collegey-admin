import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerListingComponent } from './career-listing.component';

describe('CareerListingComponent', () => {
  let component: CareerListingComponent;
  let fixture: ComponentFixture<CareerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
