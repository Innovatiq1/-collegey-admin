import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollegyProgramTextComponent } from './view-collegy-program-text.component';

describe('ViewCollegyProgramTextComponent', () => {
  let component: ViewCollegyProgramTextComponent;
  let fixture: ComponentFixture<ViewCollegyProgramTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCollegyProgramTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCollegyProgramTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
