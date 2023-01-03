import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentInformationComponent } from './show-student-information.component';

describe('ShowStudentInformationComponent', () => {
  let component: ShowStudentInformationComponent;
  let fixture: ComponentFixture<ShowStudentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
