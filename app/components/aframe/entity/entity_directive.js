import { isObject, isArray, isUndefined, equals } from 'angular';

function formatAttrs(attrs, oldAttrs = false) {
	const attrArray = [];

	if (attrs && isObject(attrs)) {
	  for (const attr of Object.keys(attrs)) {
	  	let val = attrs[attr];

			if ( attr && !equals(val, oldAttrs[attr]) )  {
				if (isArray(val)) {
		  		val = attrs[attr].map( (a, i) => {
		  			return attrs[attr][i];
		  		}).join(' ');
		  	}

		  	if (oldAttrs === false) {
					attrArray.push(`${attr}="${val}"`);
					//console.log(`Attribute ${attr}="${val}" added; NEW`);
		  	} else {
					attrArray[attr] = val;
					//console.log(`Attribute ${attr}="${val}" added`);
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
    	entities: '<?',
    	attrs: '<?'
    },
    transclude: true,
		link(scope, element, attributes, sceneCtrl, transclude) {

			const IS_ASSET = (attributes.hasOwnProperty('asset') && attributes.asset);

			/* PULL TYPE AND ASSET FLAG FROM ATTRS */
			/* IF ENTITY IS NOT ASSET, A-* PREFIX */
			let type = attributes.type || 'entity';
			if (!IS_ASSET) {
				type = `a-${type}`;
			}

			/* FORMAT STRING OF ATTR BINDINGS */
		  const attrs = formatAttrs(scope.attrs).join(' ');

    	/* CHECK IF NEW ELEMENT HAS CHILDREN */
    	/* MAKE FULL COMPILE STRING IF DEFINED */
    	let entities = '';
      if (isUndefined(scope.entities)) {
      	scope.entities = [];
      }
      	entities = `<aframe-entity
      								${ IS_ASSET ? 'asset' : '' }
      								ng-repeat="entity in entities track by ('${ IS_ASSET ? 'asset' : 'entity' }_' + entity.type + $index)"
      								ng-if="${ IS_ASSET ? 'asset' : 'entity' }"
      								type="{{entity.type}}"
      								attrs="entity.attrs"
      								entities="entity.entities">
      							</aframe-entity>`;

      /* MAKE STRING FOR NEW DOM ELEMENT */
      /* COMPILE ELEMENT AGAINST SCOPE */
      /* REPLACE DIRECTIVE ELEMENT */
			const $entity = `<${type} ${attrs}>${entities}</${type}>`;

			$compile($entity)(scope, (clone, cloneScope) => {

      	element.replaceWith(clone);
	      element.remove();

      	const attrWatch = scope.$watch('attrs', (newVal, oldVal) => {

					const newAttrs = formatAttrs(newVal, oldVal);
					if ( newAttrs && isObject(newAttrs) ) {
						clone.attr(newAttrs);
					}

					if (oldVal && isObject(oldVal)) {
						for (const attr of Object.keys(oldVal)) {
							if (oldVal[attr] && !newVal[attr]) {
								// console.log(`Attribute ${attr} removed from <${type}>`);
								clone.removeAttr(attr);
							}
						}
					}

      	}); // end $watch

				// **
				// CLEAN UP ELEMENT ON SCOPE $DESTROY?	
	      cloneScope.$on('$destroy', () => {
	      	attrWatch();
	        clone.remove();
	      	element.remove();
	        // element(document.getElementById(scope.attrs.id)).remove();
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
