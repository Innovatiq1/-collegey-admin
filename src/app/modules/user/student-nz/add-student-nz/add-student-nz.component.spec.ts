import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentNzComponent } from './add-student-nz.component';

describe('AddStudentNzComponent', () => {
  let component: AddStudentNzComponent;
  let fixture: ComponentFixture<AddStudentNzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentNzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentNzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
