import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorProjectInviteComponent } from './view-mentor-project-invite.component';

describe('ViewMentorProjectInviteComponent', () => {
  let component: ViewMentorProjectInviteComponent;
  let fixture: ComponentFixture<ViewMentorProjectInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorProjectInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorProjectInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
