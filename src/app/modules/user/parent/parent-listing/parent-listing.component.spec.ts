import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentListingComponent } from './parent-listing.component';

describe('ParentListingComponent', () => {
  let component: ParentListingComponent;
  let fixture: ComponentFixture<ParentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
