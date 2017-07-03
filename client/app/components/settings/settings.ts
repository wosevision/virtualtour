import { NgModule } from 'ng-metadata/core';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngStorage from 'angular-storage';

import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { ConnectionDetailsService } from './connection/connection-details.service';

import './settings.scss';

@NgModule({
  imports: [
    uiRouter,
    ngAnimate,
    ngMaterial,
    ngCookies,
    ngStorage
  ],
  declarations: [SettingsComponent],
  providers: [SettingsService, ConnectionDetailsService]
})
export class SettingsModule {}
