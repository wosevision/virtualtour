import { NgModule } from 'ng-metadata/core';

import { SceneModule } from './scene/scene';
import { SkyModule } from './sky/sky';
import { EntityModule } from './entity/entity';

@NgModule({
  imports: [
    SceneModule,
    SkyModule,
    EntityModule
  ]
})
export class AFrameModule { }
