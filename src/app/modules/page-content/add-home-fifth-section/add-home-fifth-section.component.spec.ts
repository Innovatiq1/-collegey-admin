import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFifthSectionComponent } from './add-home-fifth-section.component';

describe('AddHomeFifthSectionComponent', () => {
  let component: AddHomeFifthSectionComponent;
  let fixture: ComponentFixture<AddHomeFifthSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeFifthSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeFifthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
