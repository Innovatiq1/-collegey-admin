import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentResourceComponent } from './view-student-resource.component';

describe('ViewStudentResourceComponent', () => {
  let component: ViewStudentResourceComponent;
  let fixture: ComponentFixture<ViewStudentResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
