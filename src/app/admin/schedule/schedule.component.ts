import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';

import { parseToCalendarEvent } from '../../core/utils/calendar.util';
import { ScheduleService } from '../../core/services/schedule.service';

@Component({
  selector: 'job-hub-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  CalendarView = CalendarView;
  view = CalendarView.Day;
  events: CalendarEvent[] = [];
  viewDate = new Date();
  isLoading = false;

  constructor(
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.changeViewDate(this.viewDate);
  }

  changeViewDate(date: Date) {
    if (this.view === CalendarView.Month) {
      const from = startOfMonth(this.viewDate).toISOString();
      const to = endOfMonth(this.viewDate).toISOString();
      this.loadSchedule(from, to);
    } else {
      const from = startOfDay(this.viewDate).toISOString();
      const to = endOfDay(this.viewDate).toISOString();
      this.loadSchedule(from, to);
    }
  }

  changeView(view: CalendarView) {
    this.view = view;
    this.changeViewDate(this.viewDate);
  }

  private async loadSchedule(from: string, to: string) {
    try {
      this.isLoading = true;
      const schedule = await this.scheduleService.query(from, to).toPromise();
      this.events = schedule.map(x => parseToCalendarEvent(x));
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

}
