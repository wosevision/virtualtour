export class LoginController implements ng.IController {
  username;
  password;

  state = {
    attempt: false,
    success: false,
    failed: false
  };

  constructor(
    private $rootScope,
    private $timeout,
    private $window,
    private $mdDialog,
    private UserAuth,
    private AUTH_EVENTS
  ) {
    'ngInject';
  }

  login(): ng.IPromise<any> {
    if (!this.state.attempt) {
      const { username, password } = this;
      if (!username || !password) return;
      this.state.attempt = true;

      return this.UserAuth.login({ username, password }).then(user => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess, user);
        this.state.success = true;
        return this.$timeout(() => {
          this.$mdDialog.hide();
        }, 2000);
      }, () => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed);
        this.state.failed = true;
        return this.$timeout(() => {
          this.state.attempt = false;
        }, 2000);
      });
    }
  }

  logout(): ng.IPromise<any> {
    return this.UserAuth.logout();
  }
}
