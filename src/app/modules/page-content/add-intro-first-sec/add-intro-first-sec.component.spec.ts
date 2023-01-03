import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntroFirstSecComponent } from './add-intro-first-sec.component';

describe('AddIntroFirstSecComponent', () => {
  let component: AddIntroFirstSecComponent;
  let fixture: ComponentFixture<AddIntroFirstSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntroFirstSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntroFirstSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
