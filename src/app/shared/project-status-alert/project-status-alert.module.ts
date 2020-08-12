import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../ui-kit/icon/icon.module';

import { ProjectStatusAlertComponent } from './project-status-alert.component';
import { SiteVisitScheduleAlertComponent } from './site-visit-schedule-alert/site-visit-schedule-alert.component';
import { EstimateReviewWarningAlertComponent } from './estimate-review-warning-alert/estimate-review-warning-alert.component';

@NgModule({
  declarations: [
    ProjectStatusAlertComponent,
    SiteVisitScheduleAlertComponent,
    EstimateReviewWarningAlertComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    ProjectStatusAlertComponent,
    SiteVisitScheduleAlertComponent,
    EstimateReviewWarningAlertComponent
  ]
})
export class ProjectStatusAlertModule { }
