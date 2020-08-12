import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProjectDetail } from '../../core/models/project';
import { ROUTES } from '../../core/data/routes';
import { ProjectStatusPipe } from '../../ui-kit/pipes/project-status.pipe';
import { MapService } from '../../ui-kit/map/map.service';
import { ProjectDetailStateService } from '../../shared/project-detail-state/project-detail-state.service';
import { ContractStatus } from '../../core/models/contract';
import { FinalProposalStatus } from '../../core/models/final-proposal';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  ROUTES = ROUTES;
  project$: Observable<ProjectDetail>;
  project: ProjectDetail;
  ContractStatus = ContractStatus;
  FinalProposalStatus = FinalProposalStatus;
  ScrollPosition = ScrollPosition;

  private unsubscribeAll$: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private projectDetailStateService: ProjectDetailStateService,
    private projectStatusPipe: ProjectStatusPipe,
    private mapService: MapService
  ) {
    this.project$ = this.projectDetailStateService.project$;
    const project = this.projectDetailStateService.project;
    project.status = projectStatusPipe.transform(project);
    this.project = project;
    this.projectDetailStateService.setProject(this.project);
  }

  ngOnInit(): void {
    this.project$.pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(value => this.project = value);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(null);
    this.unsubscribeAll$.complete();
  }

  openMapDialog() {
    if (this.project.latitude && this.project.longitude) {
      this.mapService.openMapDialog(this.project.latitude, this.project.longitude, this.project.address);
    }
  }
}
