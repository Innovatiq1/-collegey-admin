import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyQuestionListComponent } from './collegey-question-list.component';

describe('CollegeyQuestionListComponent', () => {
  let component: CollegeyQuestionListComponent;
  let fixture: ComponentFixture<CollegeyQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
