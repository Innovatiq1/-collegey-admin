import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyQuestionComponent } from './collegey-question.component';

describe('CollegeyQuestionComponent', () => {
  let component: CollegeyQuestionComponent;
  let fixture: ComponentFixture<CollegeyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
