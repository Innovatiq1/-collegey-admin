import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIntroFirstSecComponent } from './view-intro-first-sec.component';

describe('ViewIntroFirstSecComponent', () => {
  let component: ViewIntroFirstSecComponent;
  let fixture: ComponentFixture<ViewIntroFirstSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIntroFirstSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIntroFirstSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
