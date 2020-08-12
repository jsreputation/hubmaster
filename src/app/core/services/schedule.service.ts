import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AddCalendarEventPayload, Calendar, Schedule } from '../models/schedule';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  query(from: string, to: string): Observable<Schedule[]> {
    const url = `${environment.api}/schedule`;
    let params = new HttpParams();
    params = params.append('from', from);
    if (to) {
      params = params.append('to', to);
    }
    return this.http.get<Schedule[]>(url, {params});
  }

  getGoogleCalendars(token: string): Observable<Calendar[]> {
    const url = `${environment.api}/schedule/calendars/${token}`;
    return this.http.get<Calendar[]>(url);
  }

  addGoogleCalendarEvent(token: string, calendarId: string, event: AddCalendarEventPayload): Observable<SuccessResponse> {
    const url = `${environment.api}/schedule/calendars/${token}/${calendarId}`;
    return this.http.post<SuccessResponse>(url, event);
  }
}
