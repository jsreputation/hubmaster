import { TestBed } from '@angular/core/testing';

import { ContractorsResolver } from './contractors.resolver';

describe('ContractorsService', () => {
  let service: ContractorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
