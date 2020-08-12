import { TestBed } from '@angular/core/testing';

import { NetworkContractorService } from './network-contractor.service';

describe('NetworkContractorService', () => {
  let service: NetworkContractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkContractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
