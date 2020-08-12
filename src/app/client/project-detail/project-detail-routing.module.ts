import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../core/data/routes';
import { MilestoneByProjectIdResolver } from '../../core/resolvers/milestone-by-project-id.resolver';
import { EstimateByProjectIdResolver } from '../../core/resolvers/estimate-by-project-id.resolver';
import { FinalProposalByProjectIdResolver } from '../../core/resolvers/final-proposal-by-project-id.resolver';
import { ContractByProjectIdResolver } from '../../core/resolvers/contract-by-project-id.resolver';
import { ProjectDetailResolverGuard } from '../../shared/project-detail-state/guards/project-detail-resolver.guard';
import { EstimateGuard } from '../../shared/project-detail-state/guards/estimate.guard';
import { ProposalGuard } from '../../shared/project-detail-state/guards/proposal.guard';
import { ContractGuard } from '../../shared/project-detail-state/guards/contract.guard';

import { ProjectDetailPanelComponent } from './project-detail-panel/project-detail-panel.component';
import { ManagementGuard } from '../../shared/project-detail-state/guards/management.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ProjectDetailResolverGuard],
    children: [
      {
        path: '',  component: ProjectDetailPanelComponent,
      },
      {
        path: ROUTES.app.estimate,
        loadChildren: () => import('./project-estimate/project-estimate.module').then(m => m.ProjectEstimateModule),
        canActivate: [EstimateGuard],
        resolve: {estimate: EstimateByProjectIdResolver}
      },
      {
        path: ROUTES.app.proposal,
        loadChildren: () => import('./project-final-proposal/project-final-proposal.module').then(m => m.ProjectFinalProposalModule),
        canActivate: [ProposalGuard],
        resolve: {proposal: FinalProposalByProjectIdResolver}
      },
      {
        path: ROUTES.app.contract,
        loadChildren: () => import('./project-contract/project-contract.module').then(m => m.ProjectContractModule),
        canActivate: [ContractGuard],
        resolve: {contract: ContractByProjectIdResolver}
      },
      {
        path: ROUTES.app.payment,
        loadChildren: () => import('./project-payment/project-payment.module').then(m => m.ProjectPaymentModule),
        canActivate: [ManagementGuard],
        resolve: {milestones: MilestoneByProjectIdResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
