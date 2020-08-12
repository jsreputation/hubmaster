import { TestBed } from '@angular/core/testing';

import { ContractByProjectIdResolver } from './contract-by-project-id.resolver';

describe('ContractByProjectIdResolver', () => {
  let service: ContractByProjectIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractByProjectIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
