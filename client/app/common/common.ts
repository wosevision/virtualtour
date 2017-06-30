import angular from 'angular';

import { PopupModule } from './popup/popup';
import { UserModule } from './user/user';
import { UtilModule } from './util/util';
import { ResourceModule } from './resource/resource';

import './common.scss';

import { AFrameModule } from './aframe/aframe';
AFrameModule.registerAll();

export const CommonModule = angular.module('app.common', [
  PopupModule,
  UserModule,
  UtilModule,
  ResourceModule,
])
  
.name;
