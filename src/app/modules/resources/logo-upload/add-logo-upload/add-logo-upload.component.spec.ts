import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogoUploadComponent } from './add-logo-upload.component';

describe('AddLogoUploadComponent', () => {
  let component: AddLogoUploadComponent;
  let fixture: ComponentFixture<AddLogoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLogoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
