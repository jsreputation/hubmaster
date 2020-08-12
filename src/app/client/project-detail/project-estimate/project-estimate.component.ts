import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { Estimate, EstimateStatus, SiteVisitSchedule } from '../../../core/models/estimate';
import { DeclineSource } from '../../../core/models/decline';
import { ProjectService } from '../../../core/services/project.service';
import { SiteVisitScheduleDialogComponent } from './site-visit-schedule-dialog/site-visit-schedule-dialog.component';
import { AddToCalendarDialogComponent } from './add-to-calendar-dialog/add-to-calendar-dialog.component';
import { DeclineService } from '../decline/decline.service';
import { ProjectDetail, ProjectStatus } from '../../../core/models/project';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { AlertService } from '../../../ui-kit/alert/alert.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { ROUTES } from '../../../core/data/routes';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerPageName } from '../../../core/models/customer';

@Component({
  selector: 'job-hub-project-estimate',
  templateUrl: './project-estimate.component.html',
  styleUrls: ['./project-estimate.component.scss']
})
export class ProjectEstimateComponent implements OnInit {

  selectedSchedule: SiteVisitSchedule;
  project: ProjectDetail;
  estimate: Estimate;
  EstimateStatus = EstimateStatus;

  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private declineService: DeclineService,
    private projectDetailStateService: ProjectDetailStateService,
    private alert: AlertService,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {
    this.estimate = this.route.snapshot.data.estimate;
    this.project = this.projectDetailStateService.project;
  }

  ngOnInit(): void {
    this.customerService.customerPageVisit(CustomerPageName.EstimatePage, this.project.id).subscribe(); // log customer visit
    this.checkSchedule();
  }

  decline() {
    this.declineService.showDeclineDialog(DeclineSource.FromEstimate, this.estimate).afterClosed().pipe(
      filter(value => value)
    ).subscribe(() => {
      this.estimate.status = EstimateStatus.Declined;
    });
  }

  scheduleSiteVisit() {
    const dialogRef = this.dialog.open(SiteVisitScheduleDialogComponent, {
      width: '735px',
      closeOnNavigation: true,
      data: this.estimate
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.estimate.status = EstimateStatus.SiteVisitScheduled;
        this.addToCalendar(value);
        // update existing estimate object after changing the site visit schedule array
        this.estimate.siteVisitSchedules.forEach(x => x.selected = false);
        const found = this.estimate.siteVisitSchedules.find(x => x.id === value.id);
        found.selected = true;
      }
      // check for selected site visit schedule
      this.checkSchedule();
    });
  }

  addToCalendar(schedule: SiteVisitSchedule) {
    this.dialog.open(AddToCalendarDialogComponent, {
      width: '735px',
      closeOnNavigation: true,
      data: schedule
    });
  }

  reschedule() {
    this.scheduleSiteVisit();
  }

  cancelSchedule() {
    this.alert.yesNo('Site visit schedule', 'Are you sure to cancel this site visit schedule?').pipe(
      filter(value => value)
    ).subscribe(async () => {
      try {
        this.isSaving = true;
        await this.projectService.cancelSiteVisitSchedule(this.project.id).toPromise();
        this.project.estimate.siteVisitSchedules.forEach(schedule => schedule.selected = false);
        this.project.estimate.status = EstimateStatus.Pending;
        this.project.status = ProjectStatus.ReviewEstimate;
        this.router.navigate([ROUTES.app.root, ROUTES.app.project, this.project.id]);
        this.selectedSchedule = null;
      } catch (e) {
        this.toastr.error(e, 'Failed to cancel site visit schedules.');
      } finally {
        this.isSaving = false;
      }
    });
  }

  private checkSchedule() {
    if (this.estimate.status === EstimateStatus.SiteVisitScheduled) {
      this.selectedSchedule = this.estimate.siteVisitSchedules.find(schedule => schedule.selected);
    }
  }
}
