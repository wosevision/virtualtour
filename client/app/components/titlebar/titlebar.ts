import { NgModule } from 'ng-metadata/core';

import { TitleBarComponent } from './titlebar.component';
import { TitleBarButtonComponent } from './titlebar-button.component';

import './titlebar.scss';

@NgModule({ 
  declarations: [ TitleBarComponent, TitleBarButtonComponent ]
})
export class TitleBarModule {}
