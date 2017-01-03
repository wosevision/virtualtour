import { isArray } from 'angular';

function UserAuth($http, UserSession) {
  'ngInject';

  var userAuth = {};

  userAuth.createSession = user => {
  	console.log('starting session creation...');
    return UserSession.create(user);
  }

  userAuth.initAuth = () => {
  	console.log('checking for user...');
    return $http
      .get('/user/me')
      .then(res => {
		  	console.log('user found');
        return userAuth.createSession(res.data.user);
      }).catch(err => {
		  	console.log('user not found');
        return userAuth.createSession(false);
      });
  }
 
  userAuth.login = ({ username, password }) => {
    return $http
      .post('/user/signin', { username, password })
      .then(res => {
        return userAuth.createSession(res.data.user);
      });
  };

  userAuth.logout = () => {
		return $http
			.post('/user/signout')
			.then(res =>{
				UserSession.destroy();
		  	console.log('user logged out');
			}, error => {
		  	console.log('error, user not logged out');
			});
  }
 
  userAuth.isAuthenticated = () => {
    return !!UserSession.userId;
  };
 
  userAuth.isAuthorized = authorizedRoles => {
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
    return (userAuth.isAuthenticated() && isAuthorized);
  };
 
  return userAuth;
}

export default {
  name: 'UserAuth',
  fn: UserAuth
};
