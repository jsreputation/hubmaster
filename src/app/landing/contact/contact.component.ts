import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../core/services/general.service';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../ui-kit/alert/alert.service';

@Component({
  selector: 'job-hub-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isSaving = false;
  isSaved = false;
  recaptchaKey = environment.googleInvisibleRecaptchaKey;

  contactForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
  }

  async sendContactUs() {
    if (this.isSaved) {
      return;
    }
    try {
      this.isSaving = true;
      await this.generalService.sendContactUsMessage(this.contactForm.value).toPromise();
      this.isSaved = true;
      this.alertService.alert('Message sent!', 'We have just received your email, in less than 24hrs you will receive a response.');
    } catch (e) {
      this.isSaved = false;
      this.alertService.alert('Message not sent!', `We are unable to connect to customer service at this moment. Please try again later.`);
    } finally {
      this.isSaving = false;
    }
  }
}
