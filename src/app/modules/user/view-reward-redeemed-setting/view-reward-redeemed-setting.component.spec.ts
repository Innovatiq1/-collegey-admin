import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRewardRedeemedSettingComponent } from './view-reward-redeemed-setting.component';

describe('ViewRewardRedeemedSettingComponent', () => {
  let component: ViewRewardRedeemedSettingComponent;
  let fixture: ComponentFixture<ViewRewardRedeemedSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRewardRedeemedSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRewardRedeemedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
