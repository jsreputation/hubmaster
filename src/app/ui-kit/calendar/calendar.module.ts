import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DateAdapter, CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { InputModule } from '../input/input.module';
import { CommonUiKitModule } from '../common-ui-kit/common-ui-kit.module';

import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { CalendarNavigatorComponent } from './calendar-navigator/calendar-navigator.component';
import { DayViewDialogComponent } from './dialogs/day-view-dialog/day-view-dialog.component';

@NgModule({
  declarations: [
    CalendarNavigatorComponent,
    MonthCalendarComponent,
    DayCalendarComponent,
    DayViewDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AngularCalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    InputModule,
    CommonUiKitModule,
  ],
  exports: [
    MonthCalendarComponent,
    DayCalendarComponent,
    CalendarNavigatorComponent
  ]
})
export class CalendarModule {
}
