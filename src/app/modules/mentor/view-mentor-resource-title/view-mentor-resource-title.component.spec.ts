import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorResourceTitleComponent } from './view-mentor-resource-title.component';

describe('ViewMentorResourceTitleComponent', () => {
  let component: ViewMentorResourceTitleComponent;
  let fixture: ComponentFixture<ViewMentorResourceTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorResourceTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorResourceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
