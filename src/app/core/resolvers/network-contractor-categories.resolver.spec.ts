import { TestBed } from '@angular/core/testing';

import { NetworkContractorCategoriesResolver } from './network-contractor-categories.resolver';

describe('NetworkContractorCategoriesResolver', () => {
  let service: NetworkContractorCategoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkContractorCategoriesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
