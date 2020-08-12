import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageBuilderKitModule } from '../../ui-kit/page-builder-kit/page-builder-kit.module';

import { PrivacyRoutingModule } from './privacy-routing.module';

import { PrivacyComponent } from './privacy.component';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    PageBuilderKitModule
  ]
})
export class PrivacyModule { }
