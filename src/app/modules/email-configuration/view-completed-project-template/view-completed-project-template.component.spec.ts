import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedProjectTemplateComponent } from './view-completed-project-template.component';

describe('ViewCompletedProjectTemplateComponent', () => {
  let component: ViewCompletedProjectTemplateComponent;
  let fixture: ComponentFixture<ViewCompletedProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompletedProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
