import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminEmailComponent } from './view-admin-email.component';

describe('ViewAdminEmailComponent', () => {
  let component: ViewAdminEmailComponent;
  let fixture: ComponentFixture<ViewAdminEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
