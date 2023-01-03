import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectRejectTemplateComponent } from './student-project-reject-template.component';

describe('StudentProjectRejectTemplateComponent', () => {
  let component: StudentProjectRejectTemplateComponent;
  let fixture: ComponentFixture<StudentProjectRejectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectRejectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectRejectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
