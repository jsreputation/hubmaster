import { TestBed } from '@angular/core/testing';

import { ChatsResolver } from './chats.resolver';

describe('ChatResolver', () => {
  let service: ChatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
