import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeFourthSecComponent } from './view-home-fourth-sec.component';

describe('ViewHomeFourthSecComponent', () => {
  let component: ViewHomeFourthSecComponent;
  let fixture: ComponentFixture<ViewHomeFourthSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeFourthSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeFourthSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
