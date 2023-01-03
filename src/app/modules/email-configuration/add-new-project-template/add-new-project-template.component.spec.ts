import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProjectTemplateComponent } from './add-new-project-template.component';

describe('AddNewProjectTemplateComponent', () => {
  let component: AddNewProjectTemplateComponent;
  let fixture: ComponentFixture<AddNewProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
