import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorRequestTemplateComponent } from './add-mentor-request-template.component';

describe('AddMentorRequestTemplateComponent', () => {
  let component: AddMentorRequestTemplateComponent;
  let fixture: ComponentFixture<AddMentorRequestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorRequestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorRequestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
