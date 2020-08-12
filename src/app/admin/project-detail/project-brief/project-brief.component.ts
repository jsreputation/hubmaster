import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ProjectDetail, projectOptions, ProjectStatus } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { ROUTES, toAbsolutePath } from '../../../core/data/routes';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { User, UserRole } from '../../../core/models/auth';
import { Location } from '../../../core/models/base';
import { projectGeneralForm } from '../../../core/data/form-labels';
import { CommonService } from '../../../core/services/common.service';
import { ScrollPosition } from '../../../core/data/scroll-pos';
import { SkipEstimateDialogComponent } from './skip-estimate-dialog/skip-estimate-dialog.component';

@Component({
  selector: 'job-hub-project-brief',
  templateUrl: './project-brief.component.html',
  styleUrls: ['./project-brief.component.scss'],
})
export class ProjectBriefComponent implements OnInit {

  isLoading = false;
  project: ProjectDetail;
  form: FormGroup;
  projectOptions = projectOptions;
  prefix = projectGeneralForm.prefix;
  ROUTES = ROUTES;
  ScrollPosition = ScrollPosition;
  UserRole = UserRole;
  contractors: User[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private projectService: ProjectService,
    private projectDetailStateService: ProjectDetailStateService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private scrollToService: ScrollToService
  ) {
    this.project = this.projectDetailStateService.project;
    this.contractors = this.route.snapshot.data.contractors;
  }

  get accessories(): FormArray {
    return this.form.get('accessories') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.projectService.buildProjectForm(this.project);
  }

  addAccessory() {
    this.accessories.push(this.projectService.buildAccessoryForm());
  }

  deleteAccessory(index: number) {
    this.accessories.removeAt(index);
  }

  addressChanged(location: Location) {
    this.form.get('latitude').setValue(location.latitude);
    this.form.get('longitude').setValue(location.longitude);
  }

  async update(notify = true) {
    try {
      if (this.form.invalid) {
        this.commonService.findInvalidField(this.form, projectGeneralForm, projectGeneralForm.prefix, ScrollPosition.AdminPanelContainer);
        return;
      }
      this.isLoading = true;
      const payload = this.form.value;
      payload.attachments = payload.attachments.map(x => typeof x !== 'string' ? x.url : x);
      const res = await this.projectService.updateProjectById(this.project.id, payload).toPromise();
      this.projectDetailStateService.setProject({...this.projectDetailStateService.project, ...res});
      if (notify) {
        this.toastr.success('Successfully updated the project detail.');
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, Failed to update project detail. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async skipEstimate() {
    const dialogRef = this.dialog.open(SkipEstimateDialogComponent, {
      width: '460px',
      closeOnNavigation: true,
      data: {contractors: this.contractors}
    });
    dialogRef.afterClosed().pipe(filter(data => data))
      .subscribe(data => {
        data.status = ProjectStatus.SiteVisitScheduled;
        this.projectDetailStateService.setProject(data);
        this.router.navigate([ROUTES.admin.root, ROUTES.admin.projects, this.project.id, ROUTES.admin.project.estimate]);
      });
  }

  async createEstimate() {
    this.project.status = ProjectStatus.EstimatePending;
    try {
      this.isLoading = true;
      await this.update(false);
      this.project.estimate = await this.projectService.getEstimateByProjectId(this.project.id).toPromise();
      this.projectDetailStateService.setProject(this.project);
      this.router.navigateByUrl(toAbsolutePath([ROUTES.admin.root, ROUTES.admin.projects, this.project.id, ROUTES.admin.project.estimate]));
      this.scrollToService.scrollTo({ target: ScrollPosition.AdminProjectDetail, container: ScrollPosition.AdminPanelContainer });
    } catch (e) {
      this.toastr.error(e, 'Unable to fetch estimate information. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}
