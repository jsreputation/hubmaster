import { TestBed } from '@angular/core/testing';

import { NetworkContractorByIdResolver } from './network-contractor-by-id.resolver';

describe('NetworkContractorByIdResolver', () => {
  let service: NetworkContractorByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkContractorByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
