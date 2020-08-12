import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { CommonUiKitModule } from '../../../ui-kit/common-ui-kit/common-ui-kit.module';
import { ProjectManageModule } from '../../../shared/project-manage/project-manage.module';
import { PipesModule } from '../../../ui-kit/pipes/pipes.module';
import { AlertModule } from '../../../ui-kit/alert/alert.module';
import { EditMilestoneDialogComponent } from './edit-milestone-dialog/edit-milestone-dialog.component';
import { InputModule } from '../../../ui-kit/input/input.module';
import { MakeRefundDialogComponent } from './make-refund-dialog/make-refund-dialog.component';
import { AvatarModule } from '../../../ui-kit/avatar/avatar.module';


@NgModule({
  declarations: [ProjectManagementComponent, EditMilestoneDialogComponent, MakeRefundDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    ProjectManagementRoutingModule,
    CommonUiKitModule,
    ProjectManageModule,
    PipesModule,
    AlertModule.forRoot(),
    InputModule,
    AvatarModule
  ]
})
export class ProjectManagementModule { }
