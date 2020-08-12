import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMasonryModule } from 'ngx-masonry';

import { ButtonModule } from '../button/button.module';

import { SectionBuilderComponent } from './section-builder/section-builder.component';
import { BrandingComponent } from './branding/branding.component';
import { PostItemCardComponent } from './post-item-card/post-item-card.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    SectionBuilderComponent,
    BrandingComponent,
    PostItemCardComponent,
    JumbotronComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    NgxMasonryModule,
    ButtonModule,
  ],
  exports: [
    SectionBuilderComponent,
    BrandingComponent,
    PostItemCardComponent,
    JumbotronComponent,
    TimelineComponent
  ]
})
export class PageBuilderKitModule {
}
