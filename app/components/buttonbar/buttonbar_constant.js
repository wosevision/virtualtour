const BUTTONBAR_VIEWS = {
  locations: {
    label: 'By location',
    icon: 'pin_drop',
    desc: 'View a list of available tour locations'
  },
  map: {
    label: 'By map',
    icon: 'map',
    desc: 'Explore locations from the UOIT Campus Map'
  },
  guided: {
    label: 'Guided tour',
    icon: 'rotate_90_degrees_ccw',
    desc: 'Take a preset trip with a video tour guide'
  },
  search: {
    label: 'Search',
    icon: 'search',
    desc: 'Find specific Virtual Tour highlights'
  },
  settings: {
    label: 'Settings',
    icon: 'tune',
    desc: 'Adjust the Virtual Tour experience'
  }
};

export default {
  name: 'BUTTONBAR_VIEWS',
  fn: BUTTONBAR_VIEWS
};

