import * as angular from 'angular';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import uiRouter from 'angular-ui-router';

import { DrilldownService } from './drilldown.service';
import { DrilldownComponent } from './drilldown.component';

import './drilldown.scss';

export const DrilldownModule = angular.module('drilldown', [
  ngMaterial,
  angulartics,
	angularticsGa,
  uiRouter,
])

.component('drilldownMenu', DrilldownComponent)

.service('DrilldownService', DrilldownService)

.name;

abstract class DrilldownSchema {
  /**
   * The drilldown level's default scene.
   */
  public default: string;
  /**
   * Short name.
   */
  public label: string;
  /**
   * Long name.
   */
  public name: string;
  /**
   * The tour ID code this level represents.
   * i.e. such as `link_2a` or `caf-2b`.
   */
  public code: string;

  /**
   * Map of tour ID codes by level type.
   * 
   * @example
   * {
   *   location: 'north',
   *   building: 'ua',
   *   scene: '2a'
   * }
   */
  public _params: object;
  /**
   * Type of tour object this drilldown level represents.
   * i.e. One of `location`, `building`, or `scene`.
   */
  public _level: string;
  /**
   * Whether this drilldown level is hidden completely.
   */
  public _hidden: boolean;
  /**
   * Whether this drilldown level's children are showing.
   */
  public _active: boolean;

  /**
   * Child drilldown items of this level; populated dynamically.
   */
  public children?: vt.IDrilldownItem[];

  constructor(schema: Partial<DrilldownSchema>) {
    Object.assign(this, schema);
  }
}

/**
 * The DrilldownItem class is a generic model for instantiating
 * members of the drilldown component; members can be recursively
 * nested.
 *
 * Has basic presentation properties, default scene property,
 * functional properties added by service, and property to
 * store child DrilldownItem instances.
 */
export class DrilldownItem extends DrilldownSchema implements vt.ICMSMetadata, vt.IDrilldownItem {
  _id: MongoId;
  __v?: number;
  updatedBy?: string;
  updatedAt?: Date;
  createdBy?: string;
  createdAt?: Date;
  constructor(schema: Partial<DrilldownSchema>) {
    super(schema);
  }
}
