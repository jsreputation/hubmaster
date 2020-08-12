import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { OverallStats } from '../models/overview';
import { Paginator } from '../models/paginator';
import { Project } from '../models/project';
import { paginatorParam } from '../utils/paginator.util';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(
    private http: HttpClient
  ) { }

  getOverallStats(): Observable<OverallStats> {
    const url = `${environment.api}/overview/stats`;
    return this.http.get<OverallStats>(url);
  }

  getPendingProjects(skip = 0, take = 5): Observable<Paginator<Project>> {
    const url = `${environment.api}/overview/pending-projects`;
    return this.http.get<Paginator<Project>>(url, {params: paginatorParam(skip, take)});
  }
}
