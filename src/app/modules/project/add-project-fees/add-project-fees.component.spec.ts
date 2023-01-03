import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectFeesComponent } from './add-project-fees.component';

describe('AddProjectFeesComponent', () => {
  let component: AddProjectFeesComponent;
  let fixture: ComponentFixture<AddProjectFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
