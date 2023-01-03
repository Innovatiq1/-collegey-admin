import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteListingComponent } from './invite-listing.component';

describe('InviteListingComponent', () => {
  let component: InviteListingComponent;
  let fixture: ComponentFixture<InviteListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
