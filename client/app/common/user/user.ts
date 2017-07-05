import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { UserAuthService } from './user-auth.service';
import { UserSessionService } from './user-session.service';

export const UserModule = angular.module('user', [
  uiRouter
])

.service('UserAuth', UserAuthService)

.service('UserSession', UserSessionService)

.name;
