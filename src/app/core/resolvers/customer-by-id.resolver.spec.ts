import { TestBed } from '@angular/core/testing';

import { CustomerByIdResolver } from './customer-by-id.resolver';

describe('CustomerByIdResolver', () => {
  let service: CustomerByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
