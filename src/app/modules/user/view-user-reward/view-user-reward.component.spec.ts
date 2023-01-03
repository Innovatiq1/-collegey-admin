import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserRewardComponent } from './view-user-reward.component';

describe('ViewUserRewardComponent', () => {
  let component: ViewUserRewardComponent;
  let fixture: ComponentFixture<ViewUserRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
