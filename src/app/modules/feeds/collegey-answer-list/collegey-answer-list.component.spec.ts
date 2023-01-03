import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyAnswerListComponent } from './collegey-answer-list.component';

describe('CollegeyAnswerListComponent', () => {
  let component: CollegeyAnswerListComponent;
  let fixture: ComponentFixture<CollegeyAnswerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyAnswerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyAnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
