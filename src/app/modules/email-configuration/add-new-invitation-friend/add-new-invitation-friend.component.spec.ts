import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInvitationFriendComponent } from './add-new-invitation-friend.component';

describe('AddNewInvitationFriendComponent', () => {
  let component: AddNewInvitationFriendComponent;
  let fixture: ComponentFixture<AddNewInvitationFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewInvitationFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInvitationFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
