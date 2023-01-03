import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFourthSectionComponent } from './add-home-fourth-section.component';

describe('AddHomeFourthSectionComponent', () => {
  let component: AddHomeFourthSectionComponent;
  let fixture: ComponentFixture<AddHomeFourthSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeFourthSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeFourthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
