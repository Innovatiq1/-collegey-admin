import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniversityLogoComponent } from './add-university-logo.component';

describe('AddUniversityLogoComponent', () => {
  let component: AddUniversityLogoComponent;
  let fixture: ComponentFixture<AddUniversityLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUniversityLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUniversityLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
