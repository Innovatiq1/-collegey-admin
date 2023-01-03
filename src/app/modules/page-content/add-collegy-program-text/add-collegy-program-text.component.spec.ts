import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegyProgramTextComponent } from './add-collegy-program-text.component';

describe('AddCollegyProgramTextComponent', () => {
  let component: AddCollegyProgramTextComponent;
  let fixture: ComponentFixture<AddCollegyProgramTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegyProgramTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegyProgramTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
