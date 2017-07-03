import { isArray } from 'angular';
import { Inject, Injectable } from 'ng-metadata/core';

import { UserSessionService } from './user-session.service';

@Injectable()
/**
 * Factory constructor function to provide authentication
 * details to app on runtime.
 *
 * Contains methods for login/logout, as well as a check
 * at initialization to determine if the server already
 * has an active user session. It also has utility methods
 * for determining the status of authorization.
 */
export class UserAuthService {
  constructor(
    @Inject('$http') private $http, 
    private UserSessionService: UserSessionService
  ) { }

  /**
   * Wrapper function for `UserSessionService.create()`.
   * 
   * @param  {object} user User object from db
   * @return {object}      User stored into session
   */
  createSession(authenticated: vt.ITourUser | boolean = false): vt.ITourUser {
  	console.log('[user-auth.service] createSession', authenticated);
    return this.UserSessionService.create(authenticated);
  }

  /**
   * Sends a small check to the server with `$http.get()` to
   * determine if there is already an active user session.
   *
   * Creates a session with the returned user; creates a blank
   * session by calling `createSesstion(false)` if no user (403)
   * is returned.
   * 
   * @return {Promise} Promise that will resolve to a user session
   */
  initAuth(): Promise<vt.ITourUser> {
    console.log('[user-auth.service] initAuth');
    return this.$http
      .get('/user/me')
      .then(res => {
        console.log('[user-auth.service] initAuth.then', res);
        return this.createSession(res.data.user);
      }).catch(err => {
        console.log('[user-auth.service] initAuth.catch', err);
        return this.createSession();
      });
  }
  // TODO: RETURN A BETTER VERSION OF THIS PROMISE? PROMISE FROM CREATESESSION?

  /**
   * Logs a user in with a username and password.
   * @param  {string} $0.username The user's email
   * @param  {string} $0.password User's keystone password
   * @return {Promise}            Promise that will resolve to a user session
   */
  login({ username, password }: { username: string, password: string }): Promise<vt.ITourUser> {
    return this.$http
      .post('/user/signin', { username, password })
      .then(res => {
        return this.createSession(res.data.user);
      });
  }
  // TODO: REJECTION HANDLING

  /**
   * Logs a user out.
   * 
   * @return {Promise} Promise that destroys session when resolved
   */
  logout(): Promise<any> {
		return this.$http
			.post('/user/signout')
			.then(res =>{
				this.UserSessionService.destroy();
		  	console.log('user logged out');
			}, error => {
		  	console.log('error, user not logged out');
			});
  }
  // TODO: REJECTION HANDLING

  /**
   * Utility method to tell whether a user is authenticated
   * with a username and password (only authenticated sessions)
   * have a userId.
   */
  isAuthenticated(): boolean {
    return !!this.UserSessionService.userId;
  }

  /**
   * Utility method to check the current authorized user's
   * roles in the the application.
   *
   * If there are no `authorizedRoles` speficied for the context,
   * it is public/allowed and the method can return true. If there
   * are roles specified, they are forced into an array (if not
   * already) and checked against the array of roles attached to
   * the current user session.
   *
   * If the user's roles contain a role that is in the `authorizedRoles`
   * list, a flag that the user is authorized is set. If the user is
   * still authenticated and is also authorized, the method can
   * return true.
   * 
   * @param  {[Array<String>]|[String]} authorizedRoles A list of roles allowed
   * @return {Boolean}                 									Whether user is allowed
   */
  isAuthorized(authorizedRoles) {
    if (!authorizedRoles || authorizedRoles.length === 0) return true;

    if (!isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }

    let isAuthorized = false;
    for (const role of this.UserSessionService.roles) {
    	if (authorizedRoles.indexOf(role) !== -1) {
    		isAuthorized = true;
    	}
    }
    return (this.isAuthenticated() && isAuthorized);
  }
}
