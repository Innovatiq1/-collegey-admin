import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProjectBannerComponent } from './mentor-project-banner.component';

describe('MentorProjectBannerComponent', () => {
  let component: MentorProjectBannerComponent;
  let fixture: ComponentFixture<MentorProjectBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorProjectBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorProjectBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
