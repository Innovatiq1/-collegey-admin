import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmentorResourcesComponent } from './viewmentor-resources.component';

describe('ViewmentorResourcesComponent', () => {
  let component: ViewmentorResourcesComponent;
  let fixture: ComponentFixture<ViewmentorResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmentorResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmentorResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
