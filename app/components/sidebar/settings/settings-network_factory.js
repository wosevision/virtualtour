function ConnectionDetails($http) {
  'ngInject';
  return $http.get('/user/connection');
}

export default {
  name: 'ConnectionDetails',
  fn: ConnectionDetails
};
