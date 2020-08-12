import { TestBed } from '@angular/core/testing';

import { JobByIdResolver } from './job-by-id.resolver';

describe('JobByIdResolver', () => {
  let service: JobByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
