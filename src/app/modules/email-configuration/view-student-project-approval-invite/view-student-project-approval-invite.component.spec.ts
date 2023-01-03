import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentProjectApprovalInviteComponent } from './view-student-project-approval-invite.component';

describe('ViewStudentProjectApprovalInviteComponent', () => {
  let component: ViewStudentProjectApprovalInviteComponent;
  let fixture: ComponentFixture<ViewStudentProjectApprovalInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentProjectApprovalInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentProjectApprovalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
