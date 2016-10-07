const BUILDER_VALS = [{
  category: 'All',
  props: [{
    name: 'position',
    default: [0, 0, 0]
  },{
    name: 'rotation',
    default: [0, 0, 0]
  },{
    name: 'scale',
    default: [0, 0, 0]
  }]
},{
  category: 'Geometry',
  props: [{
    name: 'translate',
    default: [0, 0, 0]
  },
    'Box',
  {
    name: 'width',
    default: 1
  }, {
    name: 'height',
    default: 1
  }, {
    name: 'depth',
    default: 1
  },
    'Circle',
  {
    name: 'radius',
    default: 1
  },{
    name: 'segments',
    default: 32
  },{
    name: 'thetaStart',
    default: 0
  },{
    name: 'thetaLength',
    default: 360
  }]
}];

export default {
  name: 'BUILDER_VALS',
  fn: BUILDER_VALS
};