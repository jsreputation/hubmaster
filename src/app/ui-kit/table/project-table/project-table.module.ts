import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '../table.module';
import { AvatarModule } from '../../avatar/avatar.module';
import { IconModule } from '../../icon/icon.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonUiKitModule } from '../../common-ui-kit/common-ui-kit.module';

import { ProjectTableComponent } from './project-table.component';

@NgModule({
  declarations: [
    ProjectTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    AvatarModule,
    IconModule,
    PipesModule,
    CommonUiKitModule
  ],
  exports: [
    ProjectTableComponent
  ]
})
export class ProjectTableModule {
}
