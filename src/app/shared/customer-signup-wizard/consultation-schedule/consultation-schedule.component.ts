import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerSignupWizardService } from '../../../core/services/customer-signup-wizard.service';
import { isValidDate } from '../../../core/utils/time.util';

@Component({
  selector: 'job-hub-consultation-schedule',
  templateUrl: './consultation-schedule.component.html',
  styleUrls: ['./consultation-schedule.component.scss']
})
export class ConsultationScheduleComponent implements OnInit {

  form: FormGroup = this.fb.group({
    consultation: this.fb.group({
      datetime: ['', Validators.required]
    })
  });

  constructor(
    private fb: FormBuilder,
    private customerSignupWizardService: CustomerSignupWizardService
  ) { }

  ngOnInit(): void {
    const consultation = this.customerSignupWizardService.getFromStorage('consultation');
    if (consultation && consultation.datetime && isValidDate(consultation.datetime)) {
      this.form.get('consultation').get('datetime').setValue(consultation.datetime);
    }
  }

}
