import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompletedProjectTemplateComponent } from './add-completed-project-template.component';

describe('AddCompletedProjectTemplateComponent', () => {
  let component: AddCompletedProjectTemplateComponent;
  let fixture: ComponentFixture<AddCompletedProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompletedProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompletedProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
