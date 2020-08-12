import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AgmCoreModule } from '@agm/core';

import { MapService } from './map.service';
import { environment } from '../../../environments/environment';

import { MapComponent } from './map.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';

@NgModule({
  declarations: [
    MapComponent,
    MapDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    })
  ],
  providers: [
    MapService
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [ MapService ]
    };
  }
}
