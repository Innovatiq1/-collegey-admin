import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMentorInformationComponent } from './show-mentor-information.component';

describe('ShowMentorInformationComponent', () => {
  let component: ShowMentorInformationComponent;
  let fixture: ComponentFixture<ShowMentorInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMentorInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMentorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
