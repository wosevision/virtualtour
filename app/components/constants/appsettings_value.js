const APP_SETTINGS = {
	USER: {
    _TOOLBAR_OPEN: {
      val: true,
      label: 'Toolbar open by default',
      icon: 'last_page'
    },
    _TOOLBAR_CONDENSED: {
      val: true,
      label: 'Toolbar condensed by default',
      icon: 'flip_to_back'
    },
    _SHOW_TOOLTIPS: {
      val: true,
      label: 'Show hint messages',
      icon: 'announcement'
    }
  }
};

export default {
  name: 'APP_SETTINGS',
  fn: APP_SETTINGS
};

