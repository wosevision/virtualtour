import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'ng-metadata/core';

@Component({
  selector: 'title-bar-button',
  template: `<md-button
    class="icon-button {{ ::$ctrl.class }}"
    ng-click="$ctrl.onClick()"
    ng-class="{ 'active': $ctrl.active }"
    aria-label="{{ ::label }}">
    <ng-md-icon
      icon="{{ $ctrl.active ? $ctrl.icon[0] || $ctrl.icon : $ctrl.icon[1] || $ctrl.icon }}"
      style="fill: currentColor;">
    </ng-md-icon>
    <md-tooltip md-direction="bottom" md-autohide ng-if="$ctrl.tooltip && !(mc.mobile||!$ctrl.settings.showHints.val)">
      {{ $ctrl.active ? ($ctrl.tooltip[0] || $ctrl.tooltip) : ($ctrl.tooltip[1] || $ctrl.tooltip) }}
    </md-tooltip>
    <span ng-if="::(!$ctrl.tooltip)">{{ ::$ctrl.label }}</span>
  </md-button>`
})
export class TitleBarButtonComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() class: string;
  @Input() active: boolean;
  @Input() tooltip: boolean | string[];
  @Input() icon: string[];

  @Output() click = new EventEmitter<string>();

  constructor() {}

  onClick() {
    this.click.emit(this.id);
  }
};
