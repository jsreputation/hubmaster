import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../../core/models/project';
import { ContractStatus } from '../../../core/models/contract';
import { ContractService } from '../../../core/services/contract.service';
import { AlertService } from '../../../ui-kit/alert/alert.service';
import { ROUTES } from '../../../core/data/routes';
import { ToastrService } from '../../../core/services/toastr.service';

@Component({
  selector: 'job-hub-request-contract',
  templateUrl: './request-contract.component.html',
  styleUrls: ['./request-contract.component.scss']
})
export class RequestContractComponent implements OnInit {

  @Input() project: Project;
  @Output() contractRequested: EventEmitter<any> = new EventEmitter<any>();

  isSaving = false;
  ContractStatus = ContractStatus;

  constructor(
    private contractService: ContractService,
    private alert: AlertService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async handleContract() {
    switch (this.project.contractStatus) {
      case ContractStatus.Pending:
        await this.requestContract();
        break;
      case ContractStatus.Requested:
        this.alert.alert('Contract Request',
          'We are preparing contract for this project, in less than 24 hours you will receive a link with contract details for you to review.');
        break;
      case ContractStatus.Ready:
      case ContractStatus.Accepted:
        this.router.navigate([ROUTES.app.root, ROUTES.app.project, this.project.id, ROUTES.app.contract]);
        break;
    }
  }

  private async requestContract() {
    try {
      this.isSaving = true;
      const accepted = this.project.finalProposal.items.filter(item => item.accept).map(item => item.id);
      await this.contractService.requestContract(this.project.id, accepted).toPromise();
      this.alert.alert('Contract Request',
        'Your request has been received, in less than 24 hours you will receive a link with contract details for you to review.');
      this.contractRequested.emit();
      this.project.contractStatus = ContractStatus.Requested;
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to submit your request. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

}
