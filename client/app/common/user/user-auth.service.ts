import { isArray } from 'angular';

/**
 * Factory constructor function to provide authentication
 * details to app on runtime.
 *
 * Contains methods for login/logout, as well as a check
 * at initialization to determine if the server already
 * has an active user session. It also has utility methods
 * for determining the status of authorization.
 * 
 * @param {object} $http       Angular's $http service
 * @param {object} UserSession The user session object/factory
 */
function UserAuthFactory($http, UserSession) {
  'ngInject';

  /**
   * Wrapper function for the `UserSession.create()`.
   * 
   * @param  {object} user User object from db
   * @return {object}      User stored into session
   */
  this.createSession = user => {
  	console.log('starting session creation...');
    return UserSession.create(user);
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
  this.initAuth = () => {
  	console.log('checking for user...');
    return $http
      .get('/user/me')
      .then(res => {
        console.log('[user-auth.service] initAuth.then', res);
        return this.createSession(res.data.user);
      }).catch(err => {
        return this.createSession(false);
        console.log('[user-auth.service] initAuth.catch', err);
      });
  }
  // TODO: RETURN A BETTER VERSION OF THIS PROMISE? PROMISE FROM CREATESESSION?

  /**
   * Logs a user in with a username and password.
   * @param  {string} $0.username The user's email
   * @param  {string} $0.password User's keystone password
   * @return {Promise}            Promise that will resolve to a user session
   */
  this.login = ({ username, password }) => {
    return $http
      .post('/user/signin', { username, password })
      .then(res => {
        return this.createSession(res.data.user);
      });
  };
  // TODO: REJECTION HANDLING

  /**
   * Logs a user out.
   * 
   * @return {Promise} Promise that destroys session when resolved
   */
  this.logout = () => {
		return $http
			.post('/user/signout')
			.then(res =>{
				UserSession.destroy();
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
   * 
   * @return {string} User _id field
   */
  this.isAuthenticated = () => {
    return !!UserSession.userId;
  };

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
  this.isAuthorized = authorizedRoles => {
    if (!authorizedRoles || authorizedRoles.length === 0) return true;

    if (!isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }

    let isAuthorized = false;
    for (const role of UserSession.roles) {
    	if (authorizedRoles.indexOf(role) !== -1) {
    		isAuthorized = true;
    	}
    }
    return (this.isAuthenticated() && isAuthorized);
  };

  return this;
}

export default UserAuthFactory;
