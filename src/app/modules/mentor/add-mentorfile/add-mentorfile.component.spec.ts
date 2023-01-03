import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorfileComponent } from './add-mentorfile.component';

describe('AddMentorfileComponent', () => {
  let component: AddMentorfileComponent;
  let fixture: ComponentFixture<AddMentorfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
