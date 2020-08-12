import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { HomeRoutingModule } from './home-routing.module';

import { PageBuilderKitModule } from '../../ui-kit/page-builder-kit/page-builder-kit.module';
import { TabsetModule } from '../../ui-kit/tabset/tabset.module';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { ButtonModule } from '../../ui-kit/button/button.module';
import { IdeaBoardModule } from '../../ui-kit/idea-board/idea-board.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';

import { HomeComponent } from './home.component';
import { HomeSwiperJumbotronComponent } from './home-swiper-jumbotron/home-swiper-jumbotron.component';
import { HomeSwiperTestimonialComponent } from './home-swiper-testimonial/home-swiper-testimonial.component';
import { HomeIdeaBoardComponent } from './home-idea-board/home-idea-board.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSwiperJumbotronComponent,
    HomeSwiperTestimonialComponent,
    HomeIdeaBoardComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    HomeRoutingModule,
    PageBuilderKitModule,
    TabsetModule,
    ButtonModule,
    CommonUiKitModule,
    IdeaBoardModule,
    PipesModule,
    ScrollToModule.forRoot(),
  ]
})
export class HomeModule { }
