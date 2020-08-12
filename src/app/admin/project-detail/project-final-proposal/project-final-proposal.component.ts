import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { projectOptions, ProjectStatus } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { FinalProposalStatus } from '../../../core/models/final-proposal';
import { ContractStatus } from '../../../core/models/contract';

@Component({
  selector: 'job-hub-project-final-proposal',
  templateUrl: './project-final-proposal.component.html',
  styleUrls: ['./project-final-proposal.component.scss']
})
export class ProjectFinalProposalComponent implements OnInit {

  project$ = this.projectDetailStateService.project$;
  proposal = this.projectDetailStateService.project.finalProposal;
  isLoading = false;
  projectOptions = projectOptions;
  FinalProposalStatus = FinalProposalStatus;
  ContractStatus = ContractStatus;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectDetailStateService: ProjectDetailStateService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {}

  async createFinalProposal(payload) {
    try {
      this.isLoading = true;
      const projectId = this.projectDetailStateService.project.id;

      const res = await this.projectService.submitFinalProposalByProjectId(projectId, payload).toPromise();
      this.toastr.success(this.proposal.id ? 'Your proposal is updated successfully.' : 'Your proposal is successfully sent to client.');
      this.proposal.id = res.id;
      this.projectDetailStateService.setProject({
        ...this.projectDetailStateService.project,
        status: ProjectStatus.FinalProposalPending,
        finalProposal: res
      });
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to submit final proposal. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}
