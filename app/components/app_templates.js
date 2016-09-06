import angular from 'angular'; export default angular.module('app.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('buttonbar/_buttonbar.html','<aside\n\tclass="button-bar"\n\tng-class="{\'collapsed\': bar.condensed}"\n\tng-if="bar.open&&!bar.mobile.screen"\n\tmd-whiteframe="2"\n\tlayout="column"\n\tflex="nogrow">\n\t<!-- <div flex="initial" ng-if="bar.condensed"></div> -->\n\t<div ng-repeat="(v,view) in ::bar.items"\n\t\tclass="button-bar-btn"\n\t\tlayout="column"\n\t\tlayout-align="center center"\n\t\tflex="noshrink"\n  \tui-sref=".{{::v}}"\n  \tui-sref-active="is-active"\n  \tui-sref-opts="{ absolute: true }"\n  \tng-click="bar.toggleMenu(\'right\', v)"\n  \tmd-ink-ripple="#0077CA"\n  \tid="{{::v}}">\n\t  \t<ng-md-icon icon="{{ ::view.icon }}" style="fill: #ffffff;"></ng-md-icon>\n\t    <span ng-bind="::view.label"></span>\n\t    <md-tooltip md-direction="left" md-autohide md-delay="bar.condensed ? 0 : 750" ng-if="!(mobile||!$root.appSettings.USER._SHOW_TOOLTIPS.val)">\n\t      {{ bar.condensed ? view.label : view.desc }}\n\t    </md-tooltip>\n  </div>\n</aside>');
$templateCache.put('chat/_chat.html','<div md-whiteframe="3" layout layout-fill flex>\n\t<md-list layout="column" layout-fill flex>\n\t  <md-subheader class="md-no-sticky" flex="nogrow">Messages</md-subheader>\n\t  <div flex="grow">\n\t\t  <md-list-item class="md-3-line" ng-repeat="item in ctrl.messages" ng-click="ctrl.addChatMessage({username:\'me\', message:\'well heyaaaa\'})">\n\t\t    <!-- <img ng-src="{{item.face}}?{{$index}}" class="md-avatar" alt="{{item.who}}" /> -->\n\t\t    <div class="md-list-item-text" layout="column">\n\t\t      <h3>{{ item.username }}</h3>\n\t\t      <p>{{ item.message }}</p>\n\t\t    </div>\n\t\t  </md-list-item>\n\t  </div>\n\t  <!-- <span flex></span> -->\n\t  <md-list-item flex="nogrow">\n      <md-input-container class="md-block">\n        <label>Enter message here</label>\n        <textarea ng-model="message" md-maxlength="150" rows="5" md-select-on-focus></textarea>\n      </md-input-container>\n\t  </md-list-item>\n\t</md-list>\n</div>');
$templateCache.put('drilldown/__drilldown.html','<div\n\tng-repeat="(loc, location) in lpc.locations"\n\tclass="location-card location-{{ ::loc }}"\n\tmd-ink-ripple="{{ !location.active && \'#003C71\' }}"\n\tng-click="lpc.activateLoc(loc)"\n\tui-sref="buildings({location: loc})"\n\tng-if="!location.hidden"\n\tlayout="column"\n\tflex="100">\n\n    \t<md-subheader class="md-primary">\n\t    <h2\n\t    flex="auto">\n\t    \t<span class="md-display-3 uoit-blue-dark">{{ location.label }} Oshawa</span><br/>\n\t      <span class="md-headline uoit-blue-light">campus location</span>\n\t    </h2>\n    \t</md-subheader>\n\n  <md-content\n  \tflex="{{ location.active ? 100 : 0 }}"\n\t\tng-if="!location.hidden"\n  \tui-view\n  \tlayout-fill\n  \tclass="building-list"\n  \tng-click="$event.stopPropagation()">\n\t</md-content>\n\n</div>');
$templateCache.put('drilldown/_drilldown-item.html','<span class="{{ item.active ? \'md-caption\' : \'md-headline\' }}">\n\t{{ ::item.label || item.name }}\n</span>\n<!-- <div style="text-align: center;">\n\t<ng-md-icon icon="{{ item.active ? \'expand_less\' : \'expand_more\' }}" style="fill: #ffffff;"></ng-md-icon>\n</div> -->\n\n<!-- <md-divider/>\n<div class="md-caption" layout="row" layout-wrap flex>\n\t<div flex="30">\n\t\t<small>level:</small> <strong>{{ ::level }}</strong><br/>\n\t</div>\n\t<div flex="70">\n\t\t<small>active:</small> <strong>{{ item.active }}</strong>\n\t\t|\n\t\t<small>hidden:</small> <strong>{{ item.hidden }}</strong>\n\t</div>\n\t<div flex="100">\n\t\t<strong><small>MODEL:</small></strong>\n\t\t<br/><pre style="font-size: 8px">{{ item | dropOffTheKids:false | json }}</pre>\n\t</div> \n</div> -->');
$templateCache.put('drilldown/_drilldown.html','<md-content\n\tclass="drilldown-menu"\n\tng-init="children = item.children; this.level = this.level + 1"\n\tlayout="column"\n\tlayout-fill\n\tflex>\n\t<div\n\t\tclass="drilldown-item"\n\t\tng-class="{ \'is-active\': item.active }"\n\t\tmd-ink-ripple="{{ item.active ? false : \'#003C71\' }}"\n\t\tng-repeat="item in item.children track by $index"\n\t\tng-style="item.style"\n\t\tng-click="toggle($event, this)"\n\t\tlayout="column"\n\t\tlayout-align="start center"\n\t\tflex="{{ item.active && !item.hidden ? \'grow\' : \'shrink\' }}">\n\t\t<div \n\t\t\tclass="drilldown-item-content"\n\t\t\tng-if="!item.hidden"\n\t\t\tlayout="column"\n\t\t\tlayout-padding\n\t\t\tflex="nogrow">\n\n\t\t</div>\n\t\t<ng-include ng-if="item.active" src="\'drilldown/_drilldown.html\'" layout layout-fill flex/>\n\t\t<!-- <flex-drilldown children="item.children"></flex-drilldown> -->\n\t</div>\n</md-content>');
$templateCache.put('titlebar/_titlebar-button.html','<md-button\n\tclass="icon-button"\n\tng-click="onClick()"\n\tng-class="{ \'active\': active }"\n\taria-label="{{ ::label }}">\n  <ng-md-icon\n  \ticon="{{ active ? icon[0] || icon : icon[1] || icon }}"\n  \tstyle="fill: #003c71;">\n  </ng-md-icon>\n  <md-tooltip md-direction="bottom" md-autohide ng-if="!(mc.mobile||!$root.appSettings.USER._SHOW_TOOLTIPS.val)">\n    {{ active ? (tooltip[0] || tooltip) : (tooltip[1] || tooltip) }}\n  </md-tooltip>\n\n</md-button>');
$templateCache.put('titlebar/_titlebar.html','<md-toolbar class="md-accent md-hue-1 title-bar" layout="row" ng-class="{\'is-mobile\' : tb.mobile.screen}"> <!-- hide show-gt-sm -->\n\n    <md-toolbar-filler flex="nogrow" layout layout-align="center center">\n      <img ui-sref="locations" ng-src="https://shared.uoit.ca/global/files/img/logos/UOIT_blue_shield.png" alt="University of Ontario Institute of Technology" class="logo-shield" id="uoit_logo">\n    </md-toolbar-filler>\n\n    <div class="md-toolbar-tools">\n      <h1 ui-sref="locations">{{::tb.title}}</h1>\n\n      <div ncy-breadcrumb></div>\n\n      <span flex></span>\n      <ng-transclude></ng-transclude>\n    </div>\n\n</md-toolbar>');
$templateCache.put('welcome/_welcome-dialog.html','<md-dialog aria-label="Welcome to the UOIT Virtual Tour" class="welcome-dialog">\n  <form>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n\n        <h2>UOIT Virtual Tour</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n        \t<ng-md-icon\n\t\t\t\t  \ticon="close"\n\t\t\t\t  \tstyle="fill: white;">\n\t\t\t\t  </ng-md-icon>\n        </md-button>\n\n      </div>\n    </md-toolbar>\n    <md-dialog-content>\n      <md-tabs\n      \tmd-dynamic-height\n      \tmd-border-bottom\n      \tmd-center-tabs>\n      \t<!-- md-stretch-tabs="always" -->\n\n        <md-tab label="Welcome">\n          <md-content class="md-padding">\n\n\t        \t<ng-md-icon\n\t        \t\tclass="dialog-icon compass-icon"\n\t\t\t\t\t  \ticon="explore"\n\t\t\t\t\t  \tsize="90"\n\t\t\t\t\t  \tstyle="fill: #0077CA;">\n\t\t\t\t\t  </ng-md-icon>\n            <h2 class="md-display-2">Welcome to the Virtual Tour!</h2>\n            <p class="md-headline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis vulputate.</p>\n\n          </md-content>\n        </md-tab>\n\n        <md-tab label="Usage tips">\n          <md-content class="md-padding" layout="column">\n\t          <div>\n\t\t        \t<ng-md-icon\n\t\t        \t\tclass="dialog-icon tips-icon"\n\t\t\t\t\t\t  \ticon="live_help"\n\t\t\t\t\t\t  \tsize="90"\n\t\t\t\t\t\t  \tstyle="fill: #0077CA;">\n\t\t\t\t\t\t  </ng-md-icon>\n\t            <h2><span class="md-display-2">Tips</span><br/><span class="md-headline">for better usage</span></h2>\n            </div>\n            <div layout="row">\n\n            \t<md-list flex>\n\t\t\t\t        <md-subheader class="md-no-sticky">First steps</md-subheader>\n\t\t\t\t        <md-divider ></md-divider>\n\t\t\t\t        <md-list-item class="md-2-line md-long-text" ng-click="null" layout="row">\n\t\t\t\t\t        <ng-md-icon icon="my_location" size="24" style="fill: #0077CA;"></ng-md-icon>\n\t\t\t\t          <div class="md-list-item-text" layout="column">\n\t\t\t\t            <h3>Tour navigation</h3>\n\t\t\t\t            <p>Learn how to use warp arrows, map view and the location menu to move from scene to scene.</p>\n\t\t\t\t          </div>\n\t\t\t\t        </md-list-item>\n\t\t\t\t        <md-list-item class="md-2-line md-long-text" ng-click="null">\n\t\t\t\t\t        <ng-md-icon icon="place" size="24" style="fill: #0077CA;"></ng-md-icon>\n\t\t\t\t          <div class="md-list-item-text" layout="column">\n\t\t\t\t            <h3>Points of interest</h3>\n\t\t\t\t            <p>See which tour elements offer interactivity and how to use them.</p>\n\t\t\t\t          </div>\n\t\t\t\t        </md-list-item>\n\t\t\t\t      </md-list>\n\n            \t<md-list flex>\n\t\t\t\t        <md-subheader class="md-no-sticky">Digging deeper</md-subheader>\n\t\t\t\t        <md-divider ></md-divider>\n\t\t\t\t        <md-list-item class="md-2-line md-long-text" ng-click="null">\n\t\t\t\t\t        <ng-md-icon icon="3d_rotation" size="24" style="fill: #0077CA;"></ng-md-icon>\n\t\t\t\t          <div class="md-list-item-text" layout="column">\n\t\t\t\t            <h3>Virtual reality</h3>\n\t\t\t\t            <p>Experience the UOIT virtual tour immersively with an Oculus\xA9 Rift.</p>\n\t\t\t\t          </div>\n\t\t\t\t        </md-list-item>\n\t\t\t\t        <md-list-item class="md-2-line md-long-text" ng-click="null" layout="row">\n\t\t\t\t          <div class="md-list-item-text" layout="column">\n\t\t\t\t            <h3>Mobile VR</h3>\n\t\t\t\t            <p>Turn your smartphone into a portal to UOIT with a mobile VR peripheral like HTC Vive, Samsung Gear or Google Cardboard.</p>\n\t\t\t\t          </div>\n\t\t\t\t        </md-list-item>\n\t\t\t\t        <md-list-item class="md-2-line md-long-text" ng-click="null" layout="row">\n\t\t\t\t          <div class="md-list-item-text" layout="column">\n\t\t\t\t            <h3>Customization</h3>\n\t\t\t\t            <p>Learn about the options available for fine-tuning the virtual tour interface.</p>\n\t\t\t\t          </div>\n\t\t\t\t        </md-list-item>\n\t\t\t\t      </md-list>\n\n\t\t\t      </div>\n\n          </md-content>\n        </md-tab>\n\n        <md-tab label="Accessibility">\n          <h2 class="md-display-2"><span class="md-display-2">Accessibility</span><br/><span class="md-headline">information</span></h1>\n          <md-content class="md-padding" layout-xs="column" layout="row">\n\t\t\t\t\t\t\n          </md-content>\n        </md-tab>\n\n      </md-tabs>\n    </md-dialog-content>\n    <md-dialog-actions layout="row" class="footer-pane">\n    \t<md-checkbox class="md-primary" aria-label="Permanently dismiss this dialog">\n        <strong>Don\'t show me this again</strong>\n      </md-checkbox>\n      <span flex></span>\n      <md-button class="md-raised md-primary" ng-click="answer(\'startTour\')" md-autofocus >\n        Take an interactive tour\n      </md-button>\n      <md-button class="md-primary" ng-click="hide()" style="margin-right:20px;" >\n        No thanks\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>');
$templateCache.put('aframe/scene/_scene.html','<a-scene id="aframe-scene">\n\t<a-assets>\n\t\t<a-asset-item id="arrow" src="images/arrow.dae"></a-asset-item>\n\t\t<aframe-entity\n\t\t\tasset="true"\n\t\t\tng-repeat="asset in assets track by (\'asset_\' + asset.type + $index)"\n\t\t\tng-if="asset"\n\t\t\ttype="{{asset.type}}"\n\t\t\tattrs="asset.attrs"\n\t\t\tentities="asset.entities">\n\t\t\t</aframe-entity>\n\t</a-assets>\n\t\t<aframe-entity\n\t\t\tng-repeat="entity in entities track by (\'entity_\' + entity.type + $index)"\n\t\t\tng-if="entity"\n\t\t\ttype="{{entity.type}}"\n\t\t\tattrs="entity.attrs"\n\t\t\tentities="entity.entities">\n\t\t</aframe-entity>\n\t\t<aframe-entity\n\t\t\tng-repeat="marker in markers track by (\'marker_\' + $index)"\n\t\t\tng-if="marker"\n\t\t\ttype="{{marker.type}}"\n\t\t\tattrs="marker.attrs">\n\t\t</aframe-entity>\n</a-scene>');
$templateCache.put('sidebar/builder/_builder-nodetree-node.html','<div ng-repeat="(a, attr) in entity.attrs">\n\n  <div ng-if="attr | isArray" layout ng-repeat="val in attr track by $index">\n    <md-slider-container flex-grow layout>\n      <md-input-container>\n      <label>{{ a }}</label>\n        <input type="number" min="0" max="10" step="0.1" flex ng-model="val" aria-label="{{ a }}" aria-controls="{{entity.type ? entity.type : \'entity\'}}{{nodeIndex}}_{{a}}-{{$index}}">\n      </md-input-container>\n      <md-slider flex="grow" min="0" max="10" step="0.1" ng-model="val" aria-label="red" id="{{entity.type ? entity.type : \'entity\'}}{{nodeIndex}}_{{a}}-{{$index}}" class="md-primary" md-discrete ng-change="bc.update(this, $modelValue, a, $index)">\n      </md-slider>\n    </md-slider-container>\n  </div>\n\n  <span ng-if="attr || \'\' | isString" layout>\n\n    <md-menu layout flex="15">\n      <md-button aria-label="Remove attribute" data-nodrag class="md-icon-button md-primary" ng-click="bc.openMenu($mdOpenMenu, $event)">\n        <ng-md-icon icon="remove_circle_outline" style="fill: red" size="20"></ng-md-icon>\n        <md-tooltip>Remove attribute</md-tooltip>\n      </md-button>\n      <md-menu-content>\n        <md-menu-item>\n        \t<label class="md-caption">Remove "<strong>{{a}}</strong>"?\n        \t\t<md-button ng-click="">Cancel</md-button><md-button class="md-raised md-warn" ng-click="">Remove</md-button>\n        \t</label>\n        </md-menu-item>\n      </md-menu-content>\n    </md-menu>\n\n    <md-input-container layout flex-grow>\n      <label>Property</label>\n      <input flex ng-model="a" required>\n    </md-input-container>\n    <md-input-container>\n      <label>Value</label>\n      <input flex ng-model="attr">\n    </md-input-container>\n  </span>\n  \n</div>\n\n<md-menu flex layout="row" layout-align="end">\n\n  <md-button aria-label="Add new attribute" data-nodrag class="md-primary" ng-click="bc.openMenu($mdOpenMenu, $event)">\n    <ng-md-icon icon="add_circle_outline" style="fill: #0077CA" size="20"></ng-md-icon> Add new attribute\n  </md-button>\n\n  <md-menu-content flex style="overflow: hidden;">\n\n    <md-menu-item>\n      <md-menu>\n        <md-button ng-click="bc.openMenu($mdOpenMenu, $event)">New</md-button>\n        <md-menu-content flex>\n          <md-menu-item><md-button ng-click="">Number</md-button></md-menu-item>\n          <md-menu-item><md-button ng-click="">String</md-button></md-menu-item>\n          <md-menu-item><md-button ng-click="">Boolean</md-button></md-menu-item>\n          <md-menu-item><md-button ng-click=""><em>src</em></md-button></md-menu-item>\n          <md-menu-item><md-button ng-click="">DOM selector</md-button></md-menu-item>\n          <md-menu-item><md-button ng-click="">&Delta; (<em>x</em>,<em>y</em>,<em>z</em>)</md-button></md-menu-item>\n        </md-menu-content>\n    </md-menu-item>\n\n    <md-menu-divider></md-menu-divider>\n\n    <md-menu-item ng-repeat="options in bc.menuOptions">\n      <md-menu>\n        <md-button ng-click="bc.openMenu($mdOpenMenu, $event)">\n          {{ options.category }}\n        </md-button>\n        <md-menu-content flex>\n\n\t        \t<md-menu-item ng-repeat="prop in options.props">\n\t            <label ng-if="!prop.name" class="md-body-2 uoitlightblue">{{ prop }}</label>\n\t        \t\t<md-button ng-click="" ng-if="prop.name">{{ prop.name }}\n\t\t        \t\t<span flex>&nbsp;</span>\n\t\t        \t\t<small class="badge text-right"><em>Default:</em> {{ prop.default }}</small>\n\t        \t\t</md-button>\n\t        \t</md-menu-item>\n\n        </md-menu-content>\n      </md-menu>\n    </md-menu-item>\n\n  </md-menu-content>\n</md-menu>');
$templateCache.put('sidebar/builder/_builder-nodetree.html','<div ui-tree-handle ng-init="this.showDetail = false"  md-ink-ripple="#0077CA">\n  <label>\n\t  <ng-md-icon icon="code" style="fill: #0077CA" size="16"></ng-md-icon>\n\t  <span class="uppercase">{{ entity.type ? entity.type : \'entity\' }}</span>\n\t  <span class="md-caption" ng-click="this.showDetail = !this.showDetail">\n\t  \t{{ this.showDetail ? \'Hide\' : \'Show\' }} details\n\t  </span>\n  </label>\n\t<md-tooltip md-direction="right" md-autohide ng-if="!this.showDetail&&!(mobile||!appSettings._USER.__SHOW_TOOLTIPS.val)">\n\t\t\t<span ng-repeat="(a, attr) in entity.attrs"><strong>{{a}}</strong>: {{attr}}, </span>\n\t</md-tooltip>\n  <!-- <span style="font-size: 10px">{{ $modelValue | json }}</span> -->\n\t<ng-include src="\'sidebar/builder/_builder-nodetree-node.html\'" ng-if="this.showDetail">\n\t</ng-include>\n\n</div>\n\n<ul ui-tree-nodes="" ng-model="entity.entities">\n  <li ng-repeat="entity in entity.entities" ui-tree-node ng-include="\'sidebar/builder/_builder-nodetree.html\'" ng-init="nodeIndex = $index">\n  </li>\n</ul>');
$templateCache.put('sidebar/builder/_builder.html','\n\n  <md-content ng-controller="builderCtrl as bc" layout="column" flex layout-fill>\n\n<!--       <md-fab-toolbar md-open="false" count="0"\n          md-direction="right">\n        <md-fab-trigger class="align-with-text">\n          <md-button aria-label="menu" class="md-fab md-primary">\n            <ng-md-icon icon="cloud_upload" style="fill: white" size="30"></ng-md-icon>\n          </md-button>\n        </md-fab-trigger>\n        <md-toolbar>\n          <md-fab-actions class="md-toolbar-tools">\n            <md-button aria-label="comment" ng-click="bc.expandAll()">\n              Expand all\n            </md-button>\n            <md-button aria-label="label" ng-click="bc.collapseAll()">\n              Collapse all\n            </md-button>\n          </md-fab-actions>\n        </md-toolbar>\n      </md-fab-toolbar> -->\n\n<!--     <div ui-tree data-drag-delay="500" flex layout-fill>\n      <ul ui-tree-nodes="" ng-model="mc.activeScene.entities" id="tree-root">\n        <li ng-repeat="entity in mc.activeScene.entities" ui-tree-node ng-include="\'sidebar/builder/_builder-nodetree.html\'" ng-init="nodeIndex = $index">\n        </li>\n      </ul>\n    </div> -->\n    <div json-builder ng-model="mc.activeScene.entities" options="bc.editorOpts" r-flex="true" prefer-text="false" flex layout-fill></div>\n  </md-content>\n</md-sidenav>\n<!-- \n<div class="debug-container" ng-if="isOpenConfig()">\n\n  <pre pretty-json="mc.entities"  />\n</div> -->');
$templateCache.put('sidebar/settings/_settings.html','<!-- <md-list>\n  <md-subheader class="md-no-sticky">App settings</md-subheader>\n  <md-list-item ng-repeat="setting in appSettings.USER">\n    <ng-md-icon icon="{{::setting.icon}}" ng-attr-style="fill: {{ setting.val? \'#003c71\':\'#cccccc\'}}"></ng-md-icon>\n    <p> &nbsp;{{ ::setting.label }} </p>\n    <md-switch class="md-primary" ng-model="setting.val" ng-change="syncSettings()"></md-switch>\n  </md-list-item>\n  <md-subheader class="md-no-sticky">Data usage</md-subheader>\n  <md-list-item layout>\n\n      <div flex="20" layout layout-align="center center">\n        <span class="md-body-1">Less</span>\n      </div>\n      <md-slider\n      \tflex\n      \tmd-vertical\n      \tmd-discrete\n      \tclass="md-primary"\n      \tng-model="rating1"\n      \tstep="1" min="1" max="5"\n      \taria-label="rating">\n      </md-slider>\n      <div flex="20" layout layout-align="center center">\n        <span class="md-body-1">More</span>\n      </div>\n\n  </md-list-item>\n</md-list> -->\n\n  \t<v-accordion class="vAccordion--default" multiple flex>\n\n\t\t  <!-- add expanded attribute to open the section -->\n\t\t  <v-pane expanded>\n\t\t    <v-pane-header>\n  \t\t\t\tApp settings\n\t\t    </v-pane-header>\n\t\t    <v-pane-content>\n\t\t\t\t\t<md-list>\n\t\t\t\t\t  <md-list-item ng-repeat="setting in appSettings.USER">\n\t\t\t\t\t    <ng-md-icon icon="{{::setting.icon}}" ng-attr-style="fill: {{ setting.val? \'#003c71\':\'#cccccc\'}}" flex="nogrow"></ng-md-icon>\n\t\t\t\t\t    <span flex>{{ ::setting.label }}</span>\n\t\t\t\t\t    <md-switch class="md-primary" ng-model="setting.val" ng-change="syncSettings()" aria-label="{{ ::setting.label }}"></md-switch>\n\t\t\t\t\t  </md-list-item>\n\t\t\t\t\t</md-list>\n\t\t    </v-pane-content>\n\t\t  </v-pane>\n\n\t\t  <v-pane>\n\t\t    <v-pane-header>\n\t\t      Data usage\n\t\t    </v-pane-header>\n\n\t\t    <v-pane-content>\n\t\t\t\t\t<md-list>\n\n\t\t\t\t\t  <md-list-item layout>\n\t\t\t\t\t\t\t\t<md-subheader class="md-no-sticky" flex="35">Compression</md-subheader>\n\t\t\t\t\t      <div flex="15" layout layout-align="center center">\n\t\t\t\t\t        <span class="md-body-1">Less</span>\n\t\t\t\t\t      </div>\n\t\t\t\t\t      <md-slider\n\t\t\t\t\t      \tflex\n\t\t\t\t\t      \tmd-vertical\n\t\t\t\t\t      \tmd-discrete\n\t\t\t\t\t      \tclass="md-primary"\n\t\t\t\t\t      \tng-model="rating1"\n\t\t\t\t\t      \tstep="1" min="1" max="5"\n\t\t\t\t\t      \taria-label="rating">\n\t\t\t\t\t      </md-slider>\n\t\t\t\t\t      <div flex="15" layout layout-align="center center">\n\t\t\t\t\t        <span class="md-body-1">More</span>\n\t\t\t\t\t      </div>\n\n\t\t\t\t\t  </md-list-item>\n\t\t\t\t\t  <md-list-item layout>\n\t\t\t\t\t\t\t\t<md-subheader class="md-no-sticky" flex="35">Preloading</md-subheader>\n\t\t\t\t\t      <div flex="15" layout layout-align="center center">\n\t\t\t\t\t        <span class="md-body-1">None</span>\n\t\t\t\t\t      </div>\n\t\t\t\t\t      <md-slider\n\t\t\t\t\t      \tflex\n\t\t\t\t\t      \tmd-vertical\n\t\t\t\t\t      \tmd-discrete\n\t\t\t\t\t      \tclass="md-primary"\n\t\t\t\t\t      \tng-model="rating1"\n\t\t\t\t\t      \tstep="1" min="1" max="5"\n\t\t\t\t\t      \taria-label="rating">\n\t\t\t\t\t      </md-slider>\n\t\t\t\t\t      <div flex="15" layout layout-align="center center">\n\t\t\t\t\t        <span class="md-body-1">Proactive</span>\n\t\t\t\t\t      </div>\n\n\t\t\t\t\t  </md-list-item>\n\n\t\t\t\t\t</md-list>\n\t\t    </v-pane-content>\n\t\t  </v-pane>\n\n\t\t</v-accordion>');}]);