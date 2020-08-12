import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from '../../ui-kit/avatar/avatar.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ConsultationCallItemComponent } from './consultation-call-item/consultation-call-item.component';
import { PendingProjectComponent } from './pending-project/pending-project.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ConsultationCallItemComponent,
    PendingProjectComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AvatarModule,
    PipesModule,
    CommonUiKitModule
  ]
})
export class DashboardModule {
}
