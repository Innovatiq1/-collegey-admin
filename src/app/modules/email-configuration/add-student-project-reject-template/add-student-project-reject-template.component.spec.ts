import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentProjectRejectTemplateComponent } from './add-student-project-reject-template.component';

describe('AddStudentProjectRejectTemplateComponent', () => {
  let component: AddStudentProjectRejectTemplateComponent;
  let fixture: ComponentFixture<AddStudentProjectRejectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentProjectRejectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentProjectRejectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
