export class PopupService {
  standardToast;
	constructor(
    private $mdDialog, 
    private $mdToast
  ) {
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
	welcome(options): ng.IPromise<any> {
	  return this.$mdDialog.show(
			this.$mdDialog.welcome(options)
		);
	}
	login(): ng.IPromise<any> {
	  return this.$mdDialog.show(
			this.$mdDialog.login()
		);
	}
	info({locals = null} = {}): ng.IPromise<any> {
		return this.$mdDialog.show(
			this.$mdDialog.info({ locals })
		);
	}
	toast(type = 'primary', { message, action = 'Dismiss' }): ng.IPromise<any> {
		const toast = this.standardToast
      .textContent(message)
      .action(action)
      .highlightClass(`md-${type}`);
		return this.$mdToast.show(toast);
	}
	error({locals = null} = {}): ng.IPromise<any> {
		return this.$mdDialog.show(
			this.$mdDialog.error({ locals })
		);
	}
	warning({ locals = { message: 'An unknown error occurred!', action: 'Dismiss'} } = {}): ng.IPromise<any> {
		const toast = this.standardToast
      .textContent(locals.message || 'An unknown error occurred!')
      .action(locals.action || 'Dismiss')
      .position('bottom right');
		return this.$mdToast.show(toast);
	}
}