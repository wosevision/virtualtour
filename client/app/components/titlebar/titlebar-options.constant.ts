type TitlebarOption = {
  id: string;
  active: boolean;
  label: string;
  tooltip: boolean | string[];
  icon: string[];
  class?: string;
};

export const TITLEBAR_OPTS: TitlebarOption[] = [{
  id: 'register',
  active: true,
  label: 'Register now',
  tooltip: false,
  icon: ['person_outline', 'person_outline'],
  class: 'cta-button bg-pink'
},{
  id: 'schedule',
  active: true,
  label: 'Schedule visit',
  tooltip: false,
  icon: ['add_alarm', 'add_alarm'],
  class: 'cta-button bg-green'
},{
  id: 'apply',
  active: true,
  label: 'Apply online',
  tooltip: false,
  icon: ['bookmark_outline', 'bookmark_outline'],
  class: 'cta-button bg-orange'
},{
  id: 'condense',
  active: true,
  label: 'Toolbar size',
  tooltip: [ 'Expand toolbar', 'Condense toolbar' ],
  icon: [ 'flip_to_front', 'flip_to_back' ]
},{
  id: 'right',
  active: true,
  label: 'Toolbar visibility',
  tooltip: [ 'Hide toolbar', 'Show toolbar' ],
  icon: [ 'last_page', 'first_page' ]
}]