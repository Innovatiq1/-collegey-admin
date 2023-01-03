import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotTitleComponent } from './mot-title.component';

describe('MotTitleComponent', () => {
  let component: MotTitleComponent;
  let fixture: ComponentFixture<MotTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
