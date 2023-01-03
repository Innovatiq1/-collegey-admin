import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorAcceptProjectInviteStatusComponent } from './add-mentor-accept-project-invite-status.component';

describe('AddMentorAcceptProjectInviteStatusComponent', () => {
  let component: AddMentorAcceptProjectInviteStatusComponent;
  let fixture: ComponentFixture<AddMentorAcceptProjectInviteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorAcceptProjectInviteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorAcceptProjectInviteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
