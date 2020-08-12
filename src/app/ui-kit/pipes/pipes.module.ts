import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RouteToAbsolutePipe } from './route-to-absolute.pipe';
import { ColorPipe } from './color.pipe';
import { FullNamePipe } from './full-name.pipe';
import { OptionLabelPipe } from './option-label.pipe';
import { JobTypePipe } from './job-type.pipe';
import { NotificationPipe } from './notification.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { ProjectStatusPipe } from './project-status.pipe';
import { IsMinePipe } from './is-mine.pipe';
import { IsProjectEditablePipe } from './is-project-editable.pipe';
import { RecentDayPipe } from './recent-day.pipe';
import { ShortNumberPipe } from './short-number.pipe';
import { TimePassedPipe } from './time-passed.pipe';
import { ContractBtnLabelPipe } from './contract-btn-label.pipe';

@NgModule({
  declarations: [
    RouteToAbsolutePipe,
    ColorPipe,
    FullNamePipe,
    OptionLabelPipe,
    JobTypePipe,
    NotificationPipe,
    TimeAgoPipe,
    ProjectStatusPipe,
    IsMinePipe,
    IsProjectEditablePipe,
    RecentDayPipe,
    ShortNumberPipe,
    TimePassedPipe,
    ContractBtnLabelPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RouteToAbsolutePipe,
    ColorPipe,
    FullNamePipe,
    OptionLabelPipe,
    JobTypePipe,
    NotificationPipe,
    TimeAgoPipe,
    ProjectStatusPipe,
    IsMinePipe,
    IsProjectEditablePipe,
    RecentDayPipe,
    ShortNumberPipe,
    TimePassedPipe,
    ContractBtnLabelPipe
  ],
  providers: [
    DatePipe
  ]
})
export class PipesModule {
}
