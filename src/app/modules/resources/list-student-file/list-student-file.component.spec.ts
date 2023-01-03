import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentFileComponent } from './list-student-file.component';

describe('ListStudentFileComponent', () => {
  let component: ListStudentFileComponent;
  let fixture: ComponentFixture<ListStudentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
