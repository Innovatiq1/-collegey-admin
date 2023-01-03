import { TestBed } from '@angular/core/testing';

import { MeetOurTeamService } from './meet-our-team.service';

describe('MeetOurTeamService', () => {
  let service: MeetOurTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetOurTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
