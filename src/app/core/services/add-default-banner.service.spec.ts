import { TestBed } from '@angular/core/testing';

import { AddDefaultBannerService } from './add-default-banner.service';

describe('AddDefaultBannerService', () => {
  let service: AddDefaultBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDefaultBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
