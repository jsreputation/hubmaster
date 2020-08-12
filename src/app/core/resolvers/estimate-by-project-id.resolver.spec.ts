import { TestBed } from '@angular/core/testing';

import { EstimateByProjectIdResolver } from './estimate-by-project-id.resolver';

describe('EstimateByProjectIdResolver', () => {
  let service: EstimateByProjectIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimateByProjectIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
