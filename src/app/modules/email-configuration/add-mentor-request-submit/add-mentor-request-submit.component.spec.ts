import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorRequestSubmitComponent } from './add-mentor-request-submit.component';

describe('AddMentorRequestSubmitComponent', () => {
  let component: AddMentorRequestSubmitComponent;
  let fixture: ComponentFixture<AddMentorRequestSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorRequestSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorRequestSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
