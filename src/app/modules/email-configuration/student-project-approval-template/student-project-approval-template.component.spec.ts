import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectApprovalTemplateComponent } from './student-project-approval-template.component';

describe('StudentProjectApprovalTemplateComponent', () => {
  let component: StudentProjectApprovalTemplateComponent;
  let fixture: ComponentFixture<StudentProjectApprovalTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectApprovalTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectApprovalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
