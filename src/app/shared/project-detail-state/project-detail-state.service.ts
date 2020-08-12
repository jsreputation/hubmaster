import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProjectDetail } from '../../core/models/project';

@Injectable()
export class ProjectDetailStateService {

  project: ProjectDetail;
  project$: BehaviorSubject<ProjectDetail> = new BehaviorSubject<ProjectDetail>(this.project);

  constructor() { }

  setProject(project: ProjectDetail) {
    this.project = project;
    this.project$.next(this.project);
  }
}
