import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardofAdvisorsComponent } from './add-boardof-advisors.component';

describe('AddBoardofAdvisorsComponent', () => {
  let component: AddBoardofAdvisorsComponent;
  let fixture: ComponentFixture<AddBoardofAdvisorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoardofAdvisorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardofAdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
