import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorResourcesComponent } from './mentor-resources.component';

describe('MentorResourcesComponent', () => {
  let component: MentorResourcesComponent;
  let fixture: ComponentFixture<MentorResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
