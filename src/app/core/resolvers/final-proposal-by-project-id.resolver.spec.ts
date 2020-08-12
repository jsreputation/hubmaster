import { TestBed } from '@angular/core/testing';

import { FinalProposalByProjectIdResolver } from './final-proposal-by-project-id.resolver';


describe('FinalProposalByProjectIdResolver', () => {
  let service: FinalProposalByProjectIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalProposalByProjectIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
