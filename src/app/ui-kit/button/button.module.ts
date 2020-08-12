import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { IconModule } from '../icon/icon.module';

import { SocialButtonsComponent } from './social-buttons/social-buttons.component';
import { RequestEstimateButtonComponent } from './request-estimate-button/request-estimate-button.component';
import { PaymentButtonComponent } from './payment-button/payment-button.component';
import { LikeButtonComponent } from './like-button/like-button.component';

@NgModule({
  declarations: [
    SocialButtonsComponent,
    RequestEstimateButtonComponent,
    PaymentButtonComponent,
    LikeButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ScrollToModule.forRoot(),
    IconModule
  ],
  exports: [
    SocialButtonsComponent,
    RequestEstimateButtonComponent,
    PaymentButtonComponent,
    LikeButtonComponent
  ]
})
export class ButtonModule { }
