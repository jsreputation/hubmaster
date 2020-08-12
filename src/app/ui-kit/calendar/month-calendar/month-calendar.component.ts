import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { DayViewDialogComponent } from '../dialogs/day-view-dialog/day-view-dialog.component';
import { timeFromTimeSlot } from '../../../core/utils/time.util';
import { SiteVisitSchedule } from '../../../core/models/estimate';

@Component({
  selector: 'job-hub-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {

  @Input() editable = false;
  @Input() events = [];
  @Input() viewDate = new Date();
  @Output() scheduleAdded: EventEmitter<SiteVisitSchedule[]> = new EventEmitter<SiteVisitSchedule[]>();

  refresh: Subject<any> = new Subject();

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  dayClicked(event) {
    if (!this.editable && !event.day.events.length) {
      return;
    }
    const dialogRef = this.dialog.open(DayViewDialogComponent, {
      width: '460px',
      data: {...event.day, editable: this.editable}
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data) {
        return;
      }
      const schedules = data.siteVisitSchedules.map(schedule => {
        return {
          from: timeFromTimeSlot(event.day.date, schedule.from).toISOString(),
          to: timeFromTimeSlot(event.day.date, schedule.to).toISOString(),
        };
      });
      this.scheduleAdded.emit(schedules);
    });
  }

}
