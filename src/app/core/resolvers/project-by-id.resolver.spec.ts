import { TestBed } from '@angular/core/testing';

import { ProjectByIdResolver } from './project-by-id.resolver';

describe('ProjectByIdResolver', () => {
  let service: ProjectByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
