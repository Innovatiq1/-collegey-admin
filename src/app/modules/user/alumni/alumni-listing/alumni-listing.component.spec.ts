import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniListingComponent } from './alumni-listing.component';

describe('AlumniListingComponent', () => {
  let component: AlumniListingComponent;
  let fixture: ComponentFixture<AlumniListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
