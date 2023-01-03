import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentProjectApprovalTemplateComponent } from './add-student-project-approval-template.component';

describe('AddStudentProjectApprovalTemplateComponent', () => {
  let component: AddStudentProjectApprovalTemplateComponent;
  let fixture: ComponentFixture<AddStudentProjectApprovalTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentProjectApprovalTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentProjectApprovalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
