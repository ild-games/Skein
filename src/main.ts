import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { SpoolAppModule } from './app/spool-app.module';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SpoolAppModule).catch(err => console.log(err));
