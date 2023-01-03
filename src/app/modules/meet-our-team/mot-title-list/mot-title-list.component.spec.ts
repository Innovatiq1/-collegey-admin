import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotTitleListComponent } from './mot-title-list.component';

describe('MotTitleListComponent', () => {
  let component: MotTitleListComponent;
  let fixture: ComponentFixture<MotTitleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotTitleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotTitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
