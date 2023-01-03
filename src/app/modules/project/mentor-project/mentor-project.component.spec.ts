import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProjectComponent } from './mentor-project.component';

describe('MentorProjectComponent', () => {
  let component: MentorProjectComponent;
  let fixture: ComponentFixture<MentorProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
