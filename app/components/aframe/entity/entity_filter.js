const entityFilter = () => {
	return function(input) {
      		let attrsObj = {};
		      angular.forEach(input, attr => {
		        if (attr.val) {
		          const val = angular.isArray(attr.val) ? attr.val.join(' ') : attr.val;
		          attrsObj[attr.prop] = val;
		          //$entity.attr(attr.prop, val);
		        } else {
		        	attrsObj[attr.prop] = '';
		          //$entity.attr(attr.prop, '');
		        }
		      });
		return attrsObj;
	};
}

export default {
	name: 'entityFilter',
	fn: entityFilter
}