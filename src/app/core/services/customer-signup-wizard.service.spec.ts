import { TestBed } from '@angular/core/testing';

import { CustomerSignupWizardService } from './customer-signup-wizard.service';

describe('CustomerSignupWizardService', () => {
  let service: CustomerSignupWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSignupWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
