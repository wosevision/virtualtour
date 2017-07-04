import { NgModule } from 'ng-metadata/core';

import { SceneComponent } from './scene.component';
import { SceneService } from './scene.service';

import './scene.scss';

@NgModule({
  declarations: [SceneComponent],
  providers: [SceneService]
})
export class SceneModule { }
