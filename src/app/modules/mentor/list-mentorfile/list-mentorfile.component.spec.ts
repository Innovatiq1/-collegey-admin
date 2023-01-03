import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMentorfileComponent } from './list-mentorfile.component';

describe('ListMentorfileComponent', () => {
  let component: ListMentorfileComponent;
  let fixture: ComponentFixture<ListMentorfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMentorfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMentorfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
