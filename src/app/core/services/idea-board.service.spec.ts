import { TestBed } from '@angular/core/testing';

import { IdeaBoardService } from './idea-board.service';

describe('IdeaBoardService', () => {
  let service: IdeaBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeaBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
