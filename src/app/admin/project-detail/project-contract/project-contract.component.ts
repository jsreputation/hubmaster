import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { Contract, ContractStatus } from '../../../core/models/contract';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { ContractComponent } from '../../../shared/contract/contract.component';
import { ProjectDetail, ProjectStatus } from '../../../core/models/project';
import { ToastrService } from '../../../core/services/toastr.service';
import { ContractService } from '../../../core/services/contract.service';
import { ScrollPosition } from '../../../core/data/scroll-pos';
import { CommonService } from '../../../core/services/common.service';
import { contractForm } from '../../../core/data/form-labels';

@Component({
  selector: 'job-hub-project-contract',
  templateUrl: './project-contract.component.html',
  styleUrls: ['./project-contract.component.scss']
})
export class ProjectContractComponent implements OnInit {

  @ViewChild(ContractComponent) contractCompRef: ContractComponent;

  isEditing = true;
  isSaving = false;
  project: ProjectDetail;
  contract: Contract = this.route.snapshot.data.contract;

  constructor(
    private route: ActivatedRoute,
    private projectDetailStateService: ProjectDetailStateService,
    private toastr: ToastrService,
    private scrollToService: ScrollToService,
    private contractService: ContractService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.project = this.projectDetailStateService.project;
    this.isEditing = !Boolean(this.contract.id);
  }

  async save() {
    try {
      const form = this.contractCompRef.form;
      if (form.invalid) {
        this.commonService.findInvalidField(form, contractForm, contractForm.prefix, ScrollPosition.AdminPanelContainer);
        return;
      }
      this.isSaving = true;
      this.projectDetailStateService.setProject({...this.project, contractStatus: ContractStatus.Ready, status: ProjectStatus.ReviewContract});
      this.contract = await this.contractService.saveContract(this.project.id, form.value).toPromise();
      this.isEditing = false;
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to save contract. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

  print() {
    // TODO: add print functionality
    this.toastr.info('Your request submitted successfully!');
  }

}
