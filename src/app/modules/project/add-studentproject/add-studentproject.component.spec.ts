import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentprojectComponent } from './add-studentproject.component';

describe('AddStudentprojectComponent', () => {
  let component: AddStudentprojectComponent;
  let fixture: ComponentFixture<AddStudentprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
