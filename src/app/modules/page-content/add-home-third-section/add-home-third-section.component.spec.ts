import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeThirdSectionComponent } from './add-home-third-section.component';

describe('AddHomeThirdSectionComponent', () => {
  let component: AddHomeThirdSectionComponent;
  let fixture: ComponentFixture<AddHomeThirdSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeThirdSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeThirdSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
