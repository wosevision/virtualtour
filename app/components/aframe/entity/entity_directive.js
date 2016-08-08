function formatAttrs(attrs, oldAttrs = false) {
	if (attrs && angular.isObject(attrs)) {

		let attrArray = [];
	  for (let attr of Object.keys(attrs)) {

	  	let val = attrs[attr];

			if ( attr && !angular.equals(val, oldAttrs[attr]) )  {

				if (angular.isArray(val)) {
		  		val = attrs[attr].map( (a, i) => {
		  			return attrs[attr][i];
		  		}).join(' ');
		  	}

		  	if (oldAttrs === false) {
					attrArray.push(`${attr}="${val}"`);
					console.log(`Attribute ${attr}="${val}" added; NEW`);
		  	} else {
					attrArray[attr] = val;
					console.log(`Attribute ${attr}="${val}" added`);
		  	}

			}

		}
		return attrArray;
	}

}

function aframeEntity($compile) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
    	entities: '=?',
    	attrs: '=?'
    },
    transclude: true,
		link(scope, element, attributes, sceneCtrl, transclude) {

			/* PULL TYPE AND ASSET FLAG FROM ATTRS */
			/* IF ENTITY IS NOT ASSET, A-* PREFIX */
			let type = attributes.type || 'entity';
			let isAsset = (attributes.hasOwnProperty('asset') && !!attributes.asset);
			if (!isAsset) {
				type = `a-${type}`;
			}

			/* FORMAT STRING OF ATTR BINDINGS */
		  let attrs = formatAttrs(scope.attrs).join(' ');

    	/* CHECK IF NEW ELEMENT HAS CHILDREN */
    	/* MAKE FULL COMPILE STRING IF DEFINED */
    	let entities = '';
      if (angular.isUndefined(scope.entities)) {
      	scope.entities = [];
      }
      	entities = `<aframe-entity
      								${ isAsset ? 'asset' : '' }
      								ng-repeat="entity in entities track by ('${ isAsset ? 'asset' : 'entity' }_' + entity.type + $index)"
      								ng-if="${ isAsset ? 'asset' : 'entity' }"
      								type="{{entity.type}}"
      								attrs="entity.attrs"
      								entities="entity.entities">
      							</aframe-entity>`;

      /* MAKE STRING FOR NEW DOM ELEMENT */
      /* COMPILE ELEMENT AGAINST SCOPE */
      /* REPLACE DIRECTIVE ELEMENT */
			let $entity = `<${type} ${attrs}>${entities}</${type}>`;

			$compile($entity)(scope, function(clone, cScope){

      	element.replaceWith(clone);
	      element.remove();

      	let attrWatch = scope.$watch('attrs', function (newVal, oldVal) {

					let newAttrs = formatAttrs(newVal, oldVal);
					if ( newAttrs && angular.isObject(newAttrs) ) {
						clone.attr(newAttrs);
					}

					if (oldVal && angular.isObject(oldVal)) {
						for (let attr of Object.keys(oldVal)) {
							if (oldVal[attr] && !newVal[attr]) {
								console.log(`Attribute ${attr} removed from <${type}>`);
								clone.removeAttr(attr);
							}
						}
					}

      	}); // end $watch

				// **
				// CLEAN UP ELEMENT ON SCOPE $DESTROY?	
	      cScope.$on('$destroy', function handleDestroyEvent() {
	      	attrWatch();
	        clone.remove();
	      	element.remove();
	        // angular.element(document.getElementById(scope.attrs.id)).remove();
	      });
	      // **
	      
			}); // end $compile
    } // end link()
  }; // end return{}
} // end aframeEntity()

export default {
  name: 'aframeEntity',
  fn: aframeEntity
};
