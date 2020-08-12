import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxMasonryModule } from 'ngx-masonry';

import { InputModule } from '../input/input.module';
import { ButtonModule } from '../button/button.module';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { CommonUiKitModule } from '../common-ui-kit/common-ui-kit.module';
import { AlertModule } from '../alert/alert.module';

import { IdeaService } from './idea.service';
import { IdeaBoardCardComponent } from './idea-board-card/idea-board-card.component';
import { IdeaBoardComponent } from './idea-board/idea-board.component';
import { ScrollableIdeaBoardComponent } from './scrollable-idea-board/scrollable-idea-board.component';
import { IdeaSetCategoryDialogComponent } from './idea-set-category-dialog/idea-set-category-dialog.component';
import { IdeaUploadDialogComponent } from './idea-upload-dialog/idea-upload-dialog.component';
import { IdeaImageDialogComponent } from './idea-image-dialog/idea-image-dialog.component';
import { StaticIdeaBoardComponent } from './static-idea-board/static-idea-board.component';
import { HomePageIdeaBoardComponent } from './home-page-idea-board/home-page-idea-board.component';
import { IdeaAnonCardComponent } from './idea-anon-card/idea-anon-card.component';
import { CustomerRegisterDialogModule } from '../../shared/customer-register-dialog/customer-register-dialog.module';

@NgModule({
  declarations: [
    IdeaBoardCardComponent,
    IdeaBoardComponent,
    ScrollableIdeaBoardComponent,
    IdeaUploadDialogComponent,
    IdeaSetCategoryDialogComponent,
    IdeaImageDialogComponent,
    StaticIdeaBoardComponent,
    HomePageIdeaBoardComponent,
    IdeaAnonCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    InputModule,
    FileUploaderModule,
    RouterModule,
    NgxMasonryModule,
    CommonUiKitModule,
    AlertModule.forRoot(),
    ButtonModule,
    CustomerRegisterDialogModule.forRoot()
  ],
  exports: [
    IdeaBoardComponent,
    ScrollableIdeaBoardComponent,
    StaticIdeaBoardComponent,
    HomePageIdeaBoardComponent
  ],
  providers: [
    IdeaService
  ]
})
export class IdeaBoardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IdeaBoardModule,
      providers: [ IdeaService ]
    };
  }
}
