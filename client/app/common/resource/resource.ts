import { NgModule } from 'ng-metadata/core';
import ngResource from 'angular-resource';

import { DraftResourceService } from './draft-resource.service';
import { MapResourceService } from './map-resource.service';
import { TourResourceService } from './tour-resource.service';

@NgModule({
  imports: [ngResource],
  providers: [
    DraftResourceService,
    MapResourceService,
    TourResourceService,
  ]
})
export class ResourceModule { }
