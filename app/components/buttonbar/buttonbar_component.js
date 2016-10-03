const buttonBar = {
  templateUrl: 'buttonbar/_buttonbar.html',
  bindings: {
  	items: '<',
  	open: '<?',
  	condensed: '<?',
  	mobile: '<?'
  },
  controller: 'ButtonbarCtrl'
}

export default {
  name: 'buttonBar',
  fn: buttonBar
};