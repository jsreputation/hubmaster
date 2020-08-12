import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProposalFormComponent } from './proposal-form/proposal-form.component';
import { InputModule } from '../../ui-kit/input/input.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { FileUploaderModule } from '../../ui-kit/file-uploader/file-uploader.module';
import { SummaryRowComponent } from './proposal-form/summary-row/summary-row.component';


@NgModule({
  declarations: [ProposalFormComponent, SummaryRowComponent],
  exports: [
    ProposalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    InputModule,
    PipesModule,
    FileUploaderModule,
    FormsModule,
  ]
})
export class FinalProposalModule {
}
