import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ROUTES } from '../../../core/data/routes';
import { ToastrService } from '../../../core/services/toastr.service';
import { PatioPackage } from '../../../core/models/patio-package';
import { patioPackageOptions } from '../../../core/data/patio-packages';
import { enumToOptions } from '../../../core/utils/enum.util';
import { MapService } from '../../../ui-kit/map/map.service';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRegisterPayload } from '../../../core/models/auth';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../ui-kit/alert/alert.service';
import { confirmPasswordValidator } from '../../../core/utils/validators.util';

@Component({
  selector: 'job-hub-schedule-consultation-dialog',
  templateUrl: './schedule-consultation-dialog.component.html',
  styleUrls: ['./schedule-consultation-dialog.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class ScheduleConsultationDialogComponent implements OnInit {

  ROUTES = ROUTES;
  form: FormGroup = this.fb.group({
    projects: [[]],
    user: this.fb.group({
      ideas: [[]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      latitude: null,
      longitude: null,
    }),
    consultation: this.fb.group({
      datetime: ['', Validators.required],
      patioPackage: this.fb.group({
        packageType: [this.data, Validators.required],
        option: ['', Validators.required],
        additional: [[], Validators.required],
      })
    }),
    terms: false
  });

  packageTypeOptions = enumToOptions<PatioPackage>(PatioPackage);
  options = [];
  additionalOptions = [];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private alert: AlertService,
    private currencyPipe: CurrencyPipe,
    private mapService: MapService,
    private customerService: CustomerService,
    private authService: AuthService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: PatioPackage,
    private dialogRef: MatDialogRef<ScheduleConsultationDialogComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mapService.getCurrentLocation().then(res => {
      this.form.get('user').get('address').setValue(res.address);
      this.form.get('user').get('latitude').setValue(res.latitude);
      this.form.get('user').get('longitude').setValue(res.longitude);
    });
    const option = patioPackageOptions[this.data] as any;
    if (option.options) {
      this.form.get('consultation').get('patioPackage').get('option').setValidators(Validators.required);
      this.form.get('consultation').get('patioPackage').get('additional').setValidators(Validators.required);
      this.options = option.options.map(x => (
        {
          label: `${x.label} ${this.currencyPipe.transform(x.price, 'USD', 'symbol-narrow', '4.0-0')}`,
          value: x.value
        })
      );
      this.additionalOptions = option.additional;
    } else {
      this.options = null;
      this.additionalOptions = null;
      this.form.get('consultation').get('patioPackage').get('option').clearValidators();
      this.form.get('consultation').get('patioPackage').get('additional').clearValidators();
    }
  }

  async register() {
    try {
      if (!this.form.get('terms').value) {
        this.toastr.info('Please agree to the terms of service and privacy and policy');
        return;
      }
      this.isSaving = true;
      const payload: CustomerRegisterPayload = this.form.value;
      const response = await this.customerService.register(payload).toPromise();
      this.authService.authenticateUser(response.accessToken);
      const firstName = payload.user.firstName;
      const datetime = payload.consultation.datetime;
      this.dialogRef.close();
      this.alert.alert(
        `Welcome ${firstName}`,
        `
         <p class="px-30">Your account has successfully been created, we look forward to speaking to you on ${this.datePipe.transform(datetime, 'MMM d, y \' at \' h:mm a')}.</p>
         <p class="px-30">In the mean time, you can continue to get ideas from our <span class="text-primary font-weight-medium">inspiration board</span> and <span class="text-primary font-weight-medium">portfolio project</span> section.</p>
        `
      );
      this.router.navigate([ROUTES.app.root, ROUTES.app.myProjects]);
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to schedule a consultation. Please try again later.');
    } finally {
      this.isSaving = false;
    }
  }

}
