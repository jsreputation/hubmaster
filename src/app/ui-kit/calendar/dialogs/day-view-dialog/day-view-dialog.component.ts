import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

import { Estimate, SiteVisitSchedule } from '../../../../core/models/estimate';
import { timeRangeValidator } from '../../../../core/utils/validators.util';
import { Schedule, ScheduleType } from '../../../../core/models/schedule';
import { ROUTES } from '../../../../core/data/routes';

@Component({
  selector: 'job-hub-day-view-dialog',
  templateUrl: './day-view-dialog.component.html',
  styleUrls: ['./day-view-dialog.component.scss']
})
export class DayViewDialogComponent implements OnInit {

  form: FormGroup;

  get siteVisitSchedules(): FormArray {
    return this.form.get('siteVisitSchedules') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<DayViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string, events: CalendarEvent[], editable: boolean },
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  addNewInterval() {
    this.siteVisitSchedules.push(this.buildSchedulesForm());
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  navigate(item: Schedule) {
    this.dialogRef.close();
    switch (item.type) {
      case ScheduleType.Consultation:
        this.router.navigate([ROUTES.admin.root, ROUTES.admin.customers, item.data.id, ROUTES.common.account.accountSetting]);
        break;
      case ScheduleType.SiteVisitSchedule:
      case ScheduleType.ProjectStart:
        this.router.navigate([ROUTES.admin.root, ROUTES.admin.projects, item.data.id, ROUTES.admin.project.brief]);
        break;
    }
  }

  private buildForm(estimate?: Estimate) {
    const data: Estimate = estimate || {} as any;
    return this.fb.group({
      siteVisitSchedules: this.fb.array(data.siteVisitSchedules ? data.siteVisitSchedules.map(x => this.buildSchedulesForm(x)) : [this.buildSchedulesForm()]),
    });
  }

  private buildSchedulesForm(schedule?: SiteVisitSchedule) {
    const data: SiteVisitSchedule = schedule || {} as any;
    return this.fb.group({
      id: data.id,
      from: [data.from || '', Validators.required],
      to: [data.to || '', [Validators.required, timeRangeValidator]],
    });
  }
}
