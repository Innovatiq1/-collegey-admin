import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuratedResourceComponent } from './view-curated-resource.component';

describe('ViewCuratedResourceComponent', () => {
  let component: ViewCuratedResourceComponent;
  let fixture: ComponentFixture<ViewCuratedResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCuratedResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCuratedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
