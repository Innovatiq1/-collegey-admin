import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreeProjectJoininggComponent } from './add-free-project-joiningg.component';

describe('AddFreeProjectJoininggComponent', () => {
  let component: AddFreeProjectJoininggComponent;
  let fixture: ComponentFixture<AddFreeProjectJoininggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFreeProjectJoininggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFreeProjectJoininggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
