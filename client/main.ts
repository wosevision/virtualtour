import { platformBrowserDynamic } from 'ng-metadata/platform-browser-dynamic';
import { enableProdMode } from 'ng-metadata/core';
import { AppModule } from './app/app';

if(process.env.NODE_ENV === 'production'){
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);