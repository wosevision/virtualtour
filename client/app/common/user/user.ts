import { NgModule } from 'ng-metadata/core';
import uiRouter from 'angular-ui-router';

import { UserAuthService } from './user-auth.service';
import { UserSessionService } from './user-session.service';

@NgModule({
  imports: [
    uiRouter,
  ],
  providers: [UserAuthService, UserSessionService]
})
export class UserModule { }