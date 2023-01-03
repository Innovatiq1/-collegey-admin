import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeFooterDataComponent } from './view-home-footer-data.component';

describe('ViewHomeFooterDataComponent', () => {
  let component: ViewHomeFooterDataComponent;
  let fixture: ComponentFixture<ViewHomeFooterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeFooterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeFooterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
