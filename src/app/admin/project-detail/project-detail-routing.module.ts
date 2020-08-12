import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../core/data/routes';
import { ContractorsResolver } from '../../core/resolvers/contractors.resolver';
import { MilestoneByProjectIdResolver } from '../../core/resolvers/milestone-by-project-id.resolver';
import { ContractByProjectIdResolver } from '../../core/resolvers/contract-by-project-id.resolver';

import { ProjectDetailResolverGuard } from '../../shared/project-detail-state/guards/project-detail-resolver.guard';
import { EstimateGuard } from '../../shared/project-detail-state/guards/estimate.guard';
import { ProposalGuard } from '../../shared/project-detail-state/guards/proposal.guard';
import { ContractGuard } from '../../shared/project-detail-state/guards/contract.guard';
import { ManagementGuard } from '../../shared/project-detail-state/guards/management.guard';

import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  {
    path: '', component: ProjectDetailComponent,
    canActivate: [ProjectDetailResolverGuard],
    children: [
      {
        path: '', redirectTo: ROUTES.admin.project.brief,
        resolve: { contractors: ContractorsResolver }
      },
      {
        path: ROUTES.admin.project.brief,
        loadChildren: () => import('./project-brief/project-brief.module').then(m => m.ProjectBriefModule),
        resolve: { contractors: ContractorsResolver }
      },
      {
        path: ROUTES.admin.project.estimate,
        loadChildren: () => import('./project-estimate/project-estimate.module').then(m => m.ProjectEstimateModule),
        canActivate: [EstimateGuard],
        resolve: { contractors: ContractorsResolver }
      },
      {
        path: ROUTES.admin.project.finalProposal,
        loadChildren: () => import('./project-final-proposal/project-final-proposal.module').then(m => m.ProjectFinalProposalModule),
        canActivate: [ProposalGuard],
      },
      {
        path: ROUTES.admin.project.contract,
        loadChildren: () => import('./project-contract/project-contract.module').then(m => m.ProjectContractModule),
        canActivate: [ContractGuard],
        resolve: { contract: ContractByProjectIdResolver }
      },
      {
        path: ROUTES.admin.project.management,
        loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule),
        canActivate: [ManagementGuard],
        resolve: { milestones: MilestoneByProjectIdResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule {
}
