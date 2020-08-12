import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Contract, ContractStatus } from '../../../core/models/contract';
import { Project } from '../../../core/models/project';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { ROUTES } from '../../../core/data/routes';
import { AgreementService } from '../agreement/agreement.service';
import { ContractService } from '../../../core/services/contract.service';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerPageName } from '../../../core/models/customer';
import { AgreementDialogAction } from '../agreement/agreement-dialog';
import { FinalProposalStatus } from '../../../core/models/final-proposal';

@Component({
  selector: 'job-hub-project-contract',
  templateUrl: './project-contract.component.html',
  styleUrls: ['./project-contract.component.scss']
})
export class ProjectContractComponent implements OnInit {

  isLoading = false;
  project: Project;
  contract: Contract = this.route.snapshot.data.contract;
  ContractStatus = ContractStatus;
  ROUTES = ROUTES;

  constructor(
    private route: ActivatedRoute,
    private projectDetailStateService: ProjectDetailStateService,
    private toastr: ToastrService,
    private agreementService: AgreementService,
    private router: Router,
    private contractService: ContractService,
    private customerService: CustomerService
  ) {
    this.project = this.projectDetailStateService.project;
  }

  ngOnInit(): void {
    this.customerService.customerPageVisit(CustomerPageName.ContractPage, this.project.id).subscribe(); // log customer visit
  }

  print() {
    this.toastr.info('This feature is not published yet. Our consultant will help you to print this contract detail.');
  }

  sign() {
    this.agreementService.openAgreeDialog().pipe(
      filter(res => res === AgreementDialogAction.Agreed)
    ).subscribe(async () => {
      try {
        this.isLoading = true;
        await this.contractService.acceptContract(this.project.id).toPromise();
        this.projectDetailStateService.setProject({
          ...this.projectDetailStateService.project,
          contractStatus: ContractStatus.Accepted,
          finalProposal: {
            ...this.projectDetailStateService.project.finalProposal,
            status: FinalProposalStatus.Accepted
          }
        });
        this.router.navigate([ROUTES.app.root, ROUTES.app.project, this.project.id, ROUTES.app.payment]);
      } catch (e) {
        this.toastr.error(e, 'Sorry, failed to accept proposal. Please try again.');
      } finally {
        this.isLoading = false;
      }
    });
  }

}
