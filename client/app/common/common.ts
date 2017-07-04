import { NgModule } from 'ng-metadata/core';
import uiRouter from 'angular-ui-router';

import { PopupModule } from './popup/popup';
import { UserModule } from './user/user';
import { UtilModule } from './util/util';
import { ResourceModule } from './resource/resource';

import './common.scss';

import { AFrameModule } from './aframe/aframe';
AFrameModule.registerAll();

@NgModule({
  imports: [
    uiRouter,
    PopupModule,
    UserModule,
    UtilModule,
    ResourceModule,
  ]
})
export class CommonModule { }
