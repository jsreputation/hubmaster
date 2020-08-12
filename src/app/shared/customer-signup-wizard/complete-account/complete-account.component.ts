import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ROUTES } from '../../../core/data/routes';
import { CustomerSignupWizardService } from '../../../core/services/customer-signup-wizard.service';
import { confirmPasswordValidator } from '../../../core/utils/validators.util';

@Component({
  selector: 'job-hub-complete-account',
  templateUrl: './complete-account.component.html',
  styleUrls: ['./complete-account.component.scss']
})
export class CompleteAccountComponent implements OnInit {

  ROUTES = ROUTES;

  form: FormGroup = this.fb.group({
    user: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      terms: [false, Validators.requiredTrue]
    })
  });

  constructor(
    private fb: FormBuilder,
    private customerSignupWizardService: CustomerSignupWizardService
  ) { }

  ngOnInit(): void {
    const user = this.customerSignupWizardService.getFromStorage('user') || {};
    const userForm = this.form.get('user');
    userForm.get('firstName').setValue(user.firstName || '');
    userForm.get('lastName').setValue(user.lastName || '');
    userForm.get('email').setValue(user.email || '');
    userForm.get('phone').setValue(user.phone || '');
    userForm.get('password').setValue(user.password || '');
    // we are not auto-populate confirm password field due to security problem
  }

}
