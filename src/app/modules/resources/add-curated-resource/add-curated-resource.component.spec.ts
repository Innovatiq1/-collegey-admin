import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCuratedResourceComponent } from './add-curated-resource.component';

describe('AddCuratedResourceComponent', () => {
  let component: AddCuratedResourceComponent;
  let fixture: ComponentFixture<AddCuratedResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCuratedResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCuratedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
