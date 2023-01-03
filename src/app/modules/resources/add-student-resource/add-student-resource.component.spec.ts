import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentResourceComponent } from './add-student-resource.component';

describe('AddStudentResourceComponent', () => {
  let component: AddStudentResourceComponent;
  let fixture: ComponentFixture<AddStudentResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
