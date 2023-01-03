import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorperksComponent } from './add-mentorperks.component';

describe('AddMentorperksComponent', () => {
  let component: AddMentorperksComponent;
  let fixture: ComponentFixture<AddMentorperksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorperksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorperksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
