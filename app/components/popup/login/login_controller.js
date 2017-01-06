function LoginCtrl($rootScope, $timeout, $window, $mdDialog, UserAuth, AUTH_EVENTS) {
  'ngInject';
  this.state = {
  	attempt: false,
  	success: false,
  	failed: false
  };
	this.login = () => {
		if (!this.state.attempt) {

			const { username, password } = this;
			if (!username || !password) return;
			this.state.attempt = true;

			UserAuth.login({ username, password }).then(user => {
	      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
	      this.state.success = true;
	      $timeout(() => {
	      	$mdDialog.hide();
	      }, 2000);
	    }, () => {
	      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	      this.state.failed = true;
	      $timeout(() => {
					this.state.attempt = false;
	      }, 2000);
	    });
		}
	};

	this.logout = () => {
		UserAuth.logout();
	}
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
