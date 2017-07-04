import { NgModule } from 'ng-metadata/core';

import { PopupModule } from './popup/popup';
import { UserModule } from './user/user';
import { UtilModule } from './util/util';
import { ResourceModule } from './resource/resource';

import './common.scss';

import { AFrameModule } from './aframe/aframe';
AFrameModule.registerAll();

@NgModule({
  imports: [
    PopupModule,
    UserModule,
    UtilModule,
    ResourceModule,
  ]
})
export class CommonModule { }
