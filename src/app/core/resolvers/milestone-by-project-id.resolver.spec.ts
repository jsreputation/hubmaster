import { TestBed } from '@angular/core/testing';

import { MilestoneByProjectIdResolver } from './milestone-by-project-id.resolver';

describe('MilestoneByProjectId.ResolverService', () => {
  let service: MilestoneByProjectIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneByProjectIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
