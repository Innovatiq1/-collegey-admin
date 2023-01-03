import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentFileComponent } from './add-student-file.component';

describe('AddStudentFileComponent', () => {
  let component: AddStudentFileComponent;
  let fixture: ComponentFixture<AddStudentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
