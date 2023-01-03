import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewProjectTemplateComponent } from './view-new-project-template.component';

describe('ViewNewProjectTemplateComponent', () => {
  let component: ViewNewProjectTemplateComponent;
  let fixture: ComponentFixture<ViewNewProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
