import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeSixthSecComponent } from './view-home-sixth-sec.component';

describe('ViewHomeSixthSecComponent', () => {
  let component: ViewHomeSixthSecComponent;
  let fixture: ComponentFixture<ViewHomeSixthSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeSixthSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeSixthSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
