import { TestBed } from '@angular/core/testing';

import { ChatByIdResolver } from './chat-by-id.resolver';

describe('ChatByIdResolver', () => {
  let service: ChatByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatByIdResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
