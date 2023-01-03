import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorprojectComponent } from './add-mentorproject.component';

describe('AddMentorprojectComponent', () => {
  let component: AddMentorprojectComponent;
  let fixture: ComponentFixture<AddMentorprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
