import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRewardRedeemedSettingComponent } from './add-reward-redeemed-setting.component';

describe('AddRewardRedeemedSettingComponent', () => {
  let component: AddRewardRedeemedSettingComponent;
  let fixture: ComponentFixture<AddRewardRedeemedSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRewardRedeemedSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardRedeemedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
