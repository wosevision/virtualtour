class $popupWindow {
	constructor($mdDialog, $mdToast) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$mdToast = $mdToast
		this.standardToast = $mdToast.simple()
      .action('Dismiss')
      .hideDelay(5000)
      .highlightAction(true)
      .highlightClass(`md-warn`)
      .position('bottom left');
	}
	welcome() {
	  return this.$mdDialog.show(
			this.$mdDialog.welcome()
		);
	}
	login() {
	  return this.$mdDialog.show(
			this.$mdDialog.login()
		);
	}
	info({locals = null} = {}) {
		return this.$mdDialog.show(
			this.$mdDialog.info({ locals })
		);
	}
	toast(type, { message, action }) {
		const toast = this.standardToast
      .textContent(message)
      .action(action)
      .highlightClass(`md-${type}`);
		return this.$mdToast.show(toast);
	}
	error({locals = null} = {}) {
		return this.$mdDialog.show(
			this.$mdDialog.error({ locals })
		);
	}
	warning({locals = null} = {}) {
		const toast = this.standardToast
      .textContent(locals.message || 'An unknown error occurred!')
      .position('bottom right');
		return this.$mdToast.show(toast);
	}
}

export default {
  name: '$popupWindow',
  fn: $popupWindow
};