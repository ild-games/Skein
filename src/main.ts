import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { SkeinAppModule } from './app/skein-app.module';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SkeinAppModule).catch(err => console.log(err));
