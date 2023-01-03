import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorProjectInviteComponent } from './add-mentor-project-invite.component';

describe('AddMentorProjectInviteComponent', () => {
  let component: AddMentorProjectInviteComponent;
  let fixture: ComponentFixture<AddMentorProjectInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorProjectInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorProjectInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
