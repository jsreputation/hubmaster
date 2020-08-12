import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { InputModule } from '../../../ui-kit/input/input.module';
import { FileUploaderModule } from '../../../ui-kit/file-uploader/file-uploader.module';
import { CommonUiKitModule } from '../../../ui-kit/common-ui-kit/common-ui-kit.module';
import { DirectivesModule } from '../../../ui-kit/directives/directives.module';
import { PipesModule } from '../../../ui-kit/pipes/pipes.module';

import { ProjectBriefRoutingModule } from './project-brief-routing.module';

import { ProjectBriefComponent } from './project-brief.component';
import { SkipEstimateDialogComponent } from './skip-estimate-dialog/skip-estimate-dialog.component';

@NgModule({
  declarations: [
    ProjectBriefComponent,
    SkipEstimateDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ProjectBriefRoutingModule,
    InputModule,
    FileUploaderModule,
    CommonUiKitModule,
    DirectivesModule,
    PipesModule,
    ScrollToModule.forRoot()
  ]
})
export class ProjectBriefModule { }
