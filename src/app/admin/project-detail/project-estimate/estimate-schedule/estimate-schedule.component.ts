import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfMonth, startOfMonth } from 'date-fns';

import { ScheduleService } from '../../../../core/services/schedule.service';
import { parseToCalendarEvent } from '../../../../core/utils/calendar.util';
import { SiteVisitSchedule } from '../../../../core/models/estimate';
import { ScheduleType } from '../../../../core/models/schedule';
import { ProjectDetailStateService } from '../../../../shared/project-detail-state/project-detail-state.service';

@Component({
  selector: 'job-hub-estimate-schedule',
  templateUrl: './estimate-schedule.component.html',
  styleUrls: ['./estimate-schedule.component.scss']
})
export class EstimateScheduleComponent implements OnInit {

  @Output() next: EventEmitter<any> = new EventEmitter<any>();

  isLoading = false;
  CalendarView = CalendarView;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  schedules: SiteVisitSchedule[] = [];
  project = this.projectDetailStateService.project;

  constructor(
    private scheduleService: ScheduleService,
    private projectDetailStateService: ProjectDetailStateService,
  ) {
  }

  ngOnInit(): void {
    this.schedules = this.projectDetailStateService.project.estimate.siteVisitSchedules || [];
    this.changeViewDate(this.viewDate);
  }

  changeViewDate(date: Date) {
    const from = startOfMonth(this.viewDate).toISOString();
    const to = endOfMonth(this.viewDate).toISOString();
    this.loadSchedule(from, to);
  }

  scheduledAdded(schedules: SiteVisitSchedule[]) {
    this.schedules = [...this.schedules, ...schedules];
    this.addNewSchedulesToEvents(schedules);
  }

  submit() {
    const estimate = {...this.projectDetailStateService.project.estimate, siteVisitSchedules: this.schedules};
    this.projectDetailStateService.setProject({...this.projectDetailStateService.project, estimate});

    this.next.emit();
  }

  private async loadSchedule(from: string, to: string) {
    try {
      this.isLoading = true;
      const schedule = await this.scheduleService.query(from, to).toPromise();
      this.events = schedule.map(x => parseToCalendarEvent(x));
      this.addNewSchedulesToEvents(this.schedules);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  private addNewSchedulesToEvents(schedules: SiteVisitSchedule[]) {
    this.events = [...this.events, ...schedules.map(schedule => {
      return parseToCalendarEvent({
        ...schedule,
        type: ScheduleType.SiteVisitSchedule,
        data: {
          name: this.project.name,
          id: this.project.id
        }
      });
    })];
  }
}
