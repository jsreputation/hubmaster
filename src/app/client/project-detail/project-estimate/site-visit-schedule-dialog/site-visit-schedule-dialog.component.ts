import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getDate, getMonth, getYear } from 'date-fns';

import { Estimate, EstimateStatus, SiteVisitSchedule } from '../../../../core/models/estimate';
import { groupBy } from '../../../../core/utils/common.util';
import { ProjectService } from '../../../../core/services/project.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { ProjectDetailStateService } from '../../../../shared/project-detail-state/project-detail-state.service';

interface ScheduleOption extends SiteVisitSchedule {
  day?: string;
}

@Component({
  selector: 'job-hub-site-visit-schedule-dialog',
  templateUrl: './site-visit-schedule-dialog.component.html',
  styleUrls: ['./site-visit-schedule-dialog.component.scss']
})
export class SiteVisitScheduleDialogComponent implements OnInit {

  isSaving = false;
  selectedDay = '';
  selectedOption: ScheduleOption;
  days: string[] = [];
  options;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Estimate,
    private dialogRef: MatDialogRef<SiteVisitScheduleDialogComponent>,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private projectDetailStateService: ProjectDetailStateService,
  ) {
  }

  ngOnInit(): void {
    this.options = groupBy('day', this.data.siteVisitSchedules.map(x => {
      return {
        ...x,
        day: `${getYear(new Date(x.from))}-${getMonth(new Date(x.from))}-${getDate(new Date(x.from))}`,
      };
    }));
    this.days = Object.keys(this.options);
    this.checkExistingSchedule();
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.selectedOption = null;
  }

  async schedule() {
    try {
      this.isSaving = true;
      const project = this.projectDetailStateService.project;
      if (project.estimate.status !== EstimateStatus.SiteVisitScheduled) {
        await this.projectService.acceptEstimate(this.data.project.id, {scheduleId: this.selectedOption.id}).toPromise();
      } else {
        await this.projectService.rescheduleSiteVisit(this.data.project.id, this.selectedOption.id).toPromise();
      }
      this.dialogRef.close(this.selectedOption);
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to schedule a site visit. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

  async requestAnotherDay() {
    try {
      this.isSaving = true;
      await this.projectService.requestAnotherDay(this.data.project.id).toPromise();
      this.dialogRef.close(null);
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to request another day for a site visit. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

  private checkExistingSchedule() {
    if (this.data.status === EstimateStatus.SiteVisitScheduled) {
      const found = this.data.siteVisitSchedules.find(x => x.selected);
      if (!found) {
        return;
      }
      this.selectedDay = `${getYear(new Date(found.from))}-${getMonth(new Date(found.from))}-${getDate(new Date(found.from))}`;
      this.selectedOption = this.options[this.selectedDay].find(x => x.id === found.id);
    }
  }

}
