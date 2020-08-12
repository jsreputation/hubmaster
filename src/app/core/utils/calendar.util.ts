import { Schedule, ScheduleType } from '../models/schedule';
import { CalendarEvent } from 'angular-calendar';

export function parseToCalendarEvent(schedule: Schedule): CalendarEvent {
  return {
    start: new Date(schedule.from),
    end: new Date(schedule.to),
    title: schedule.data.name,
    meta: schedule,
    allDay: schedule.type === ScheduleType.ProjectStart
  };
}
