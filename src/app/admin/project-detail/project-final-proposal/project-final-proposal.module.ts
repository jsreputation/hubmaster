import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectFinalProposalRoutingModule } from './project-final-proposal-routing.module';
import { ProjectFinalProposalComponent } from './project-final-proposal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../ui-kit/input/input.module';
import { FileUploaderModule } from '../../../ui-kit/file-uploader/file-uploader.module';
import { FinalProposalModule } from '../../../shared/final-proposal/final-proposal.module';
import { CommonUiKitModule } from '../../../ui-kit/common-ui-kit/common-ui-kit.module';


@NgModule({
  declarations: [ProjectFinalProposalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectFinalProposalRoutingModule,
    InputModule,
    FileUploaderModule,
    FinalProposalModule,
    CommonUiKitModule
  ]
})
export class ProjectFinalProposalModule { }
