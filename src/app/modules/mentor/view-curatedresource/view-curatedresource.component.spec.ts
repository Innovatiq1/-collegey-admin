import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuratedresourceComponent } from './view-curatedresource.component';

describe('ViewCuratedresourceComponent', () => {
  let component: ViewCuratedresourceComponent;
  let fixture: ComponentFixture<ViewCuratedresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCuratedresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCuratedresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
