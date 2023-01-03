import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQnaComponent } from './view-qna.component';

describe('ViewQnaComponent', () => {
  let component: ViewQnaComponent;
  let fixture: ComponentFixture<ViewQnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
