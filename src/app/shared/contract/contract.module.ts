import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '../../ui-kit/input/input.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { FileUploaderModule } from '../../ui-kit/file-uploader/file-uploader.module';

import { ContractComponent } from './contract.component';
import { PortfolioProjectOnContractComponent } from './portfolio-project-on-contract/portfolio-project-on-contract.component';
import { ContractCommentInputComponent } from './contract-comment-input/contract-comment-input.component';

@NgModule({
  declarations: [
    ContractComponent,
    PortfolioProjectOnContractComponent,
    ContractCommentInputComponent
  ],
  exports: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    PipesModule,
    FileUploaderModule,
  ]
})
export class ContractModule { }
