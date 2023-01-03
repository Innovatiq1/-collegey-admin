import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgComponent } from './sdg.component';

describe('SdgComponent', () => {
  let component: SdgComponent;
  let fixture: ComponentFixture<SdgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
