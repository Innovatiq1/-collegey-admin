import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorResourceTitleComponent } from './add-mentor-resource-title.component';

describe('AddMentorResourceTitleComponent', () => {
  let component: AddMentorResourceTitleComponent;
  let fixture: ComponentFixture<AddMentorResourceTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorResourceTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorResourceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
