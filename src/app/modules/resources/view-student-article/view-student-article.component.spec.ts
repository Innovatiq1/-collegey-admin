import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentArticleComponent } from './view-student-article.component';

describe('ViewStudentArticleComponent', () => {
  let component: ViewStudentArticleComponent;
  let fixture: ComponentFixture<ViewStudentArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
