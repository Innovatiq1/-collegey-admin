import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCuratedresourceComponent } from './add-curatedresource.component';

describe('AddCuratedresourceComponent', () => {
  let component: AddCuratedresourceComponent;
  let fixture: ComponentFixture<AddCuratedresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCuratedresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCuratedresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
