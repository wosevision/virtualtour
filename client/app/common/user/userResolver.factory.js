function UserResolverFactory($q, $rootScope, $state, UserSession) {
  return {
    resolve() {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch(() => UserSession.user, function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
}

export default UserResolverFactory;