import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { UserAuthService } from './user-auth.service';
import { UserSessionService } from './user-session.service';

import { USER_DEFAULTS } from './user-defaults.constant';

export const UserModule = angular.module('user', [
  uiRouter
])

.service('UserAuth', UserAuthService)

.service('UserSession', UserSessionService)

.constant('USER_DEFAULTS', USER_DEFAULTS)

.constant('USER_ROLES', {
	admin: 'admin',
	editor: 'editor',
	contributor: 'contributor'
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.name;
