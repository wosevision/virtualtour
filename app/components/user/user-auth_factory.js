import { isArray } from 'angular';

function UserAuth($http, UserSession) {
  'ngInject';

  var userAuth = {};

  userAuth.createSession = user => {
    UserSession.create(user);
    return UserSession.user;
  }

  userAuth.initAuth = () => {
    return $http
      .get('/user/me')
      .then(res => {
        return userAuth.createSession(res.data.user);
      }, err => {
      	return false;
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
				alert('success! logged out user:');
			}, error => {
				alert('error! user not logged out:');
			});
  }
 
  userAuth.isAuthenticated = () => {
    return !!UserSession.userId;
  };
 
  userAuth.isAuthorized = authorizedRoles => {
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
