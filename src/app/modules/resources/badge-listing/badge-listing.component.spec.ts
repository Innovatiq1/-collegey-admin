import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeListingComponent } from './badge-listing.component';

describe('BadgeListingComponent', () => {
  let component: BadgeListingComponent;
  let fixture: ComponentFixture<BadgeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
