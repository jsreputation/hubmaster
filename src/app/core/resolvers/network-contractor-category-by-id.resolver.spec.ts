import { TestBed } from '@angular/core/testing';

import { NetworkContractorCategoryByIdResolver } from './network-contractor-category-by-id.resolver';

describe('NetworkContractorCategoryByIdResolver', () => {
  let service: NetworkContractorCategoryByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkContractorCategoryByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
