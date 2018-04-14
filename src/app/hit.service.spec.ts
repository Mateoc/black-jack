import { TestBed, inject } from '@angular/core/testing';

import { HitService } from './hit.service';

describe('HitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HitService]
    });
  });

  it('should be created', inject([HitService], (service: HitService) => {
    expect(service).toBeTruthy();
  }));
});
