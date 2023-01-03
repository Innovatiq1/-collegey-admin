import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorListingComponent } from './counsellor-listing.component';

describe('CounsellorListingComponent', () => {
  let component: CounsellorListingComponent;
  let fixture: ComponentFixture<CounsellorListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
