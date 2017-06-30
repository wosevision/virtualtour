export const USER_DEFAULTS: Partial<vt.ITourUser> = {
  settings: {
    toolbarOpen: {
      val: true,
      label: 'Toolbar open by default',
      icon: 'last_page'
    },
    toolbarCondensed: {
      val: false,
      label: 'Toolbar condensed by default',
      icon: 'flip_to_back'
    },
    showHints: {
      val: true,
      label: 'Show hint messages',
      icon: 'announcement'
    },
    showWelcome: {
      val: true,
      label: 'Always show welcome',
      icon: 'live_tv'
    }
  },
  usage: {
    auto: {
      val: true
    },
    compression: {
      val: 1,
      min: 1,
      max: 5,
      step: 1,
      label: 'Compression level',
      labels: ['Less', 'More'],
      levels: {
        '<= 2': [10, 5, 10],
        '== 3': [5, 5, 5],
        '>= 4': [0, 10, 0]
      }
    },
    preloading: {
      val: 0,
      min: 0,
      max: 2,
      step: 1,
      label: 'Preloading strategy',
      labels: ['None', 'Proactive'],
      levels: {
        '== 0': [5, 10, 0], //no preload
        '== 1': [5, 5, 5], //preload
        '== 2': [5, 0, 5] //preload & keep last
      }
    },
    // cache: {
    //   val: 0,
    //   min: 0,
    //   max: 250,
    //   step: 25,
    //   label: 'Cache control',
    //   labels: ['No cache', '250MB'],
    //   levels: [
    //   ]
    // },
    resolution: {
      val: 1,
      min: 0,
      max: 1,
      step: 1,
      label: 'Image resolution',
      labels: ['Low', 'High'],
      levels: {
        '== 0': [0, 0, 0], //low-res
        '== 1': [10, 5, 10], //high-res
      }
    }
  }
};