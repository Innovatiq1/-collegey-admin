import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMentortestimonialComponent } from './list-mentortestimonial.component';

describe('ListMentortestimonialComponent', () => {
  let component: ListMentortestimonialComponent;
  let fixture: ComponentFixture<ListMentortestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMentortestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMentortestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
