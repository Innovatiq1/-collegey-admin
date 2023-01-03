import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorListingComponent } from './mentor-listing.component';

describe('MentorListingComponent', () => {
  let component: MentorListingComponent;
  let fixture: ComponentFixture<MentorListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
