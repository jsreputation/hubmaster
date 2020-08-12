import { TestBed } from '@angular/core/testing';

import { ContractByIdResolver } from './contract-by-id.resolver';

describe('ContractByIdResolver', () => {
  let service: ContractByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
