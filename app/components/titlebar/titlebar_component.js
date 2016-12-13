const titleBar = {
  transclude: true,
  templateUrl: 'titlebar/_titlebar.html',
  bindings: {
  	title: '@',
  	mobile: '<'
  }
}

export default {
  name: 'titleBar',
  fn: titleBar
};