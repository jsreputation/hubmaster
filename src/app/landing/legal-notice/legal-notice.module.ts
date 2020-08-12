import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageBuilderKitModule } from '../../ui-kit/page-builder-kit/page-builder-kit.module';

import { LegalNoticeRoutingModule } from './legal-notice-routing.module';

import { LegalNoticeComponent } from './legal-notice.component';

@NgModule({
  declarations: [
    LegalNoticeComponent
  ],
  imports: [
    CommonModule,
    LegalNoticeRoutingModule,
    PageBuilderKitModule
  ]
})
export class LegalNoticeModule {
}
