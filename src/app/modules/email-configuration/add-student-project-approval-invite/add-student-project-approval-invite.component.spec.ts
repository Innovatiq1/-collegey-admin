import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentProjectApprovalInviteComponent } from './add-student-project-approval-invite.component';

describe('AddStudentProjectApprovalInviteComponent', () => {
  let component: AddStudentProjectApprovalInviteComponent;
  let fixture: ComponentFixture<AddStudentProjectApprovalInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentProjectApprovalInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentProjectApprovalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
