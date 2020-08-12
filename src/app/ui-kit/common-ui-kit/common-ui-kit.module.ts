import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule } from '../icon/icon.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { ImageRendererComponent } from './image-renderer/image-renderer.component';
import { ActionDropdownComponent } from './action-dropdown/action-dropdown.component';
import { ScheduleIconComponent } from './schedule-icon/schedule-icon.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    ScheduleIconComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgbDropdownModule,
    IconModule
  ],
  exports: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    ScheduleIconComponent
  ]
})
export class CommonUiKitModule {
}
