import { NgModule } from 'ng-metadata/core';

import { SkyComponent } from './sky.component';
import { SkyService } from './sky.service';

@NgModule({
  declarations: [SkyComponent],
  providers: [SkyService]
})
export class SkyModule {}
