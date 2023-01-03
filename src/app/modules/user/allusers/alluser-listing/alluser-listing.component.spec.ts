import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserListingComponent } from './alluser-listing.component';

describe('AlluserListingComponent', () => {
  let component: AlluserListingComponent;
  let fixture: ComponentFixture<AlluserListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlluserListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlluserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
