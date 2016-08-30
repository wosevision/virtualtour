// function DrilldownCtrl($scope, $state, $timeout, $mdSidenav, $log) {
// 	'ngInject';

//   const dd = this;

//   // dd.children = {};

//   dd.activateLoc = function(loc) {
//   	// if (!dd.locations[loc].active) {
// 	  	Object.keys(dd.children).forEach( function(key) {
// 	  		let isEqual = (key == loc);
// 	  		dd.children[key].active = isEqual ? !dd.children[key].active : dd.children[key].active;
// 	  		dd.children[key].hidden = !isEqual ? !dd.children[key].hidden : dd.children[key].hidden;
// 	  	});
//   	// } else {
// 	  // 	Object.keys(dd.children).forEach( function(key) {
// 	  // 		dd.children[key].active = false;
// 	  // 		dd.children[key].hidden = false;
// 	  // 	});
//   	// }
//   }

// }
function deactivateItem(item) {
	// make item inactive but unhide (default state)
	item.active = item.hidden = false;

	// if the item has children...
	if (item.children) {
		// recursively deactivate its children as well
		angular.forEach(item.children, deactivateItem);
	}
}

function toggleItem(item) {
	// compare the current iterated item to 'this'
	// make the item active and unhide if same
	// make the item inactive and hide if not
	item.active = (item === this);
	item.hidden = !(item === this);

	// if the item is NOW inactive and has children...
	if (!item.active && item.children) {
		// ...then deactivateItem() all its children
		angular.forEach(item.children, deactivateItem);
	}
}

class DrilldownCtrl {
	constructor($scope) {
		'ngInject';
		this.$sc = $scope;
		this.$sc.toggle = ($ev, $sc, level) => {
			// prevent click from bubbling up
			$ev.stopPropagation();

			// if clicked item is inactive...
			if (!$sc.item.active) {
				// ...then go up a level, run toggleItem() on every item
				// ...using the clicked item as the context of 'this'
				angular.forEach($sc.$parent.children, toggleItem, $sc.item);
			} else {
				// ...otherwise, go up a level and deactivateItem() all
				angular.forEach($sc.$parent.children, deactivateItem);
			}

			// run callback
			if (this.onToggle && typeof this.onToggle === 'function') {
				this.onToggle()($ev, $sc, level);
			}

		}
	}
}

export default {
  name: 'DrilldownCtrl',
  fn: DrilldownCtrl
};
