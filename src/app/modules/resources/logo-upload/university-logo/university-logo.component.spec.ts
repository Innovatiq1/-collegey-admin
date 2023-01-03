import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityLogoComponent } from './university-logo.component';

describe('UniversityLogoComponent', () => {
  let component: UniversityLogoComponent;
  let fixture: ComponentFixture<UniversityLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
