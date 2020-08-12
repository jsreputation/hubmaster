import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ContractorsResolver } from '../../core/resolvers/contractors.resolver';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    resolve: { contractors: ContractorsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
