import { NgModule } from 'ng-metadata/core';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { ButtonbarComponent } from './buttonbar.component';

import './buttonbar.scss';

@NgModule({
  imports: [
    uiRouter,
    ngMaterial
  ],
  declarations: [ButtonbarComponent]
})
export class ButtonbarModule {}