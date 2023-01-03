import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminEmailComponent } from './add-admin-email.component';

describe('AddAdminEmailComponent', () => {
  let component: AddAdminEmailComponent;
  let fixture: ComponentFixture<AddAdminEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
