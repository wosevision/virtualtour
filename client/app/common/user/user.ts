import { NgModule } from 'ng-metadata/core';

import { UserAuthService } from './user-auth.service';
import { UserSessionService } from './user-session.service';

@NgModule({
  providers: [UserAuthService, UserSessionService]
})
export class UserModule { }