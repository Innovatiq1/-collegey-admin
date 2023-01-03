import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewInvitationFriendComponent } from './view-new-invitation-friend.component';

describe('ViewNewInvitationFriendComponent', () => {
  let component: ViewNewInvitationFriendComponent;
  let fixture: ComponentFixture<ViewNewInvitationFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewInvitationFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewInvitationFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
