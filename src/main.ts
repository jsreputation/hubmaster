import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as LogRocket from 'logrocket';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  LogRocket.init('seb2rp/jd-landscaping');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
