import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardofDirectorsComponent } from './add-boardof-directors.component';

describe('AddBoardofDirectorsComponent', () => {
  let component: AddBoardofDirectorsComponent;
  let fixture: ComponentFixture<AddBoardofDirectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoardofDirectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardofDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
