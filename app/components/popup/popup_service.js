class $popupWindow {
	constructor($mdDialog, $mdToast) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$mdToast = $mdToast
	}
	welcome() {
	  return this.$mdDialog.show(
			this.$mdDialog.welcome()
		);
	}
	error({locals = null} = {}) {
		return this.$mdDialog.show(
			this.$mdDialog.error({ locals })
		);
	}
	warning({locals = null} = {}) {
		const toast = this.$mdToast.simple()
      .textContent(locals.message || 'An unknown error occurred!')
      .action('Dismiss')
      .hideDelay(5000)
      .highlightAction(true)
      .highlightClass(`md-warn`)
      .position('bottom right');
		return this.$mdToast.show(toast);
	}
	toast(type, { message, action }) {
		const toast = this.$mdToast.simple()
      .textContent(message)
      .action(action)
      .highlightAction(true)
      .highlightClass(`md-${type}`)
      .position('bottom left');
		return this.$mdToast.show(toast);
	}
}

export default {
  name: '$popupWindow',
  fn: $popupWindow
};