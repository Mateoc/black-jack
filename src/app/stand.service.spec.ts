import { TestBed, inject } from '@angular/core/testing';

import { StandService } from './stand.service';

describe('StandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandService]
    });
  });

  it('should be created', inject([StandService], (service: StandService) => {
    expect(service).toBeTruthy();
  }));
});
