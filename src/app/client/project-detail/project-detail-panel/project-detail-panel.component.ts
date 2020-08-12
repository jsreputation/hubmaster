import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { ProjectDetail, projectOptions, ProjectStatus } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';
import { ROUTES } from '../../../core/data/routes';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerPageName } from '../../../core/models/customer';

@Component({
  selector: 'job-hub-project-detail-panel',
  templateUrl: './project-detail-panel.component.html',
  styleUrls: ['./project-detail-panel.component.scss']
})
export class ProjectDetailPanelComponent implements OnInit {

  ProjectStatus = ProjectStatus;
  projectOptions = projectOptions;
  form: FormGroup;
  project: ProjectDetail;
  ROUTES = ROUTES;

  constructor(
    private projectService: ProjectService,
    private projectDetailStateService: ProjectDetailStateService,
    private customerService: CustomerService
  ) {
    this.project = this.projectDetailStateService.project;
  }

  get accessories(): FormArray {
    return this.form.get('accessories') as FormArray;
  }

  ngOnInit(): void {
    this.customerService.customerPageVisit(CustomerPageName.BriefPage, this.project.id).subscribe(); // log customer visits
    this.form = this.projectService.buildProjectForm(this.project);
  }
}
