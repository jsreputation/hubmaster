import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '../../ui-kit/input/input.module';
import { ProjectTableModule } from '../../ui-kit/table/project-table/project-table.module';

import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ProjectsRoutingModule,
    ProjectTableModule
  ]
})
export class ProjectsModule {
}
