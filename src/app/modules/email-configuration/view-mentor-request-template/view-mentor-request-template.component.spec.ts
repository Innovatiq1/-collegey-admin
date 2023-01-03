import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorRequestTemplateComponent } from './view-mentor-request-template.component';

describe('ViewMentorRequestTemplateComponent', () => {
  let component: ViewMentorRequestTemplateComponent;
  let fixture: ComponentFixture<ViewMentorRequestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorRequestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorRequestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
