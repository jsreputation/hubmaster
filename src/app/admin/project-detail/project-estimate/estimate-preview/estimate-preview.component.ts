import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Estimate, EstimateStatus } from '../../../../core/models/estimate';
import { ProjectService } from '../../../../core/services/project.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { ProjectStatus } from '../../../../core/models/project';
import { ROUTES, toAbsolutePath } from '../../../../core/data/routes';
import { ProjectDetailStateService } from '../../../../shared/project-detail-state/project-detail-state.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { UserRole } from '../../../../core/models/auth';

@Component({
  selector: 'job-hub-estimate-preview',
  templateUrl: './estimate-preview.component.html',
  styleUrls: ['./estimate-preview.component.scss']
})
export class EstimatePreviewComponent implements OnInit {

  @Input() isEditing = false;
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  project$ = this.projectDetailStateService.project$;
  contractors = this.route.snapshot.data.contractors;
  isLoading = false;
  estimate: Estimate = this.projectDetailStateService.project.estimate;
  form: FormGroup;
  UserRole = UserRole;
  EstimateStatus = EstimateStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectDetailStateService: ProjectDetailStateService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private adminLayoutService: AdminLayoutService,
  ) {
  }

  ngOnInit(): void {
    if (!this.estimate.id) {
      this.toastr.info('Please assign a contractor to this project.');
      this.adminLayoutService.scrollTop(0);
    }
  }

  onEdit() {
    if (!this.isEditing) {
      this.edit.emit();
    } else {
      this.sendEstimate();
    }
  }

  async sendEstimate() {
    try {
      this.isLoading = true;
      const projectId = this.projectDetailStateService.project.id;
      this.estimate.contractorUserId = this.form.value.contractorUserId;
      this.estimate = await this.projectService.submitEstimateByProjectId(projectId, this.estimate).toPromise();
      this.projectDetailStateService.setProject({
        ...this.projectDetailStateService.project,
        estimate: this.estimate,
        status: ProjectStatus.ReviewEstimate
      });
      if (this.isEditing) {
        this.toastr.success('Your estimate is successfully updated.');
        this.isEditing = false;
      } else {
        this.toastr.success('Your estimate is successfully sent to client.');
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to submit your estimate. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async createFinalProposal() {
    try {
      this.isLoading = true;
      const project = this.projectDetailStateService.project;
      project.finalProposal = await this.projectService.getFinalProposalByProjectId(project.id).toPromise();
      this.projectDetailStateService.setProject({...project, status: ProjectStatus.CreatingFinalProposal});
      this.router.navigateByUrl(toAbsolutePath([ROUTES.admin.root, ROUTES.admin.projects, project.id, ROUTES.admin.project.finalProposal]));
    } catch (e) {
      this.toastr.error(e, 'Failed to fetch final proposal data. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}
