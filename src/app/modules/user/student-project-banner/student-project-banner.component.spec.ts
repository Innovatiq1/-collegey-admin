import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectBannerComponent } from './student-project-banner.component';

describe('StudentProjectBannerComponent', () => {
  let component: StudentProjectBannerComponent;
  let fixture: ComponentFixture<StudentProjectBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
