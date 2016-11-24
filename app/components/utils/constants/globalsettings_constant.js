const GLOBAL_SETTINGS = {
	APP: {
		_TITLE: 'UOIT Virtual Tour',
	  _API_URL: '/api/v1'
	  // KEYSTONE HEROKU
	  // https://virtualtour-cms.herokuapp.com
	  // 
	  // VTS HEROKU
	  // https://virtualtour-server.herokuapp.com
	  // 
	  // KEYSTONE LOCAL
	  // http://localhost:3000/api/v1
	  // 
	  // VTS LOCAL
	  // http://localhost:8080/api
	}
};

export default {
  name: 'GLOBAL_SETTINGS',
  fn: GLOBAL_SETTINGS
};

