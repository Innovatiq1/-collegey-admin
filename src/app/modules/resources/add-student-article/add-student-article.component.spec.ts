import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentArticleComponent } from './add-student-article.component';

describe('AddStudentArticleComponent', () => {
  let component: AddStudentArticleComponent;
  let fixture: ComponentFixture<AddStudentArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
