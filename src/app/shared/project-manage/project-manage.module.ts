import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { AvatarModule } from '../../ui-kit/avatar/avatar.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { AlertModule } from '../../ui-kit/alert/alert.module';

import { MilestoneComponent } from './milestone/milestone.component';
import { RequestChatComponent } from './request-chat/request-chat.component';
import { RequestContractComponent } from './request-contract/request-contract.component';
import { InformationTooltipModule } from '../../ui-kit/information-tooltip/information-tooltip.module';

@NgModule({
  declarations: [
    MilestoneComponent,
    RequestChatComponent,
    RequestContractComponent],
  exports: [
    MilestoneComponent,
    RequestChatComponent,
    RequestContractComponent
  ],
  imports: [
    MatSlideToggleModule,
    CommonModule,
    RouterModule,
    AvatarModule,
    RouterModule,
    PipesModule,
    CommonUiKitModule,
    AlertModule.forRoot(),
    InformationTooltipModule
  ]
})
export class ProjectManageModule {
}
