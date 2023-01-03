import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestListingComponent } from './invest-listing.component';

describe('InvestListingComponent', () => {
  let component: InvestListingComponent;
  let fixture: ComponentFixture<InvestListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
