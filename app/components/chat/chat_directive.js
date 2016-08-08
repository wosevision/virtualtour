function chatWindow() {
  return {
    // require: '^uibTabset',
    replace: true,
    templateUrl: 'chat/_chat.html',
    // templateUrl: function(element, attrs) {
    //   return attrs.templateUrl || 'uib/template/tabs/tab.html';
    // },
    transclude: true,
    scope: {

      // heading: '@',
      // index: '=?',
      // classes: '@?',
      // onSelect: '&select', //This callback is called in contentHeadingTransclude
      //                     //once it inserts the tab's content into the dom
      // onDeselect: '&deselect'
    },
    controller: 'ChatCtrl',
    controllerAs: 'ctrl',
    link: function(scope, elm, attrs, ChatCtrl, transclude) {
    	// scope.messages = ChatCtrl.messages;
      // scope.disabled = false;
      // if (attrs.disable) {
      //   scope.$parent.$watch($parse(attrs.disable), function(value) {
      //     scope.disabled = !! value;
      //   });
      // }

      // if (angular.isUndefined(attrs.index)) {
      //   if (tabsetCtrl.tabs && tabsetCtrl.tabs.length) {
      //     scope.index = Math.max.apply(null, tabsetCtrl.tabs.map(function(t) { return t.index; })) + 1;
      //   } else {
      //     scope.index = 0;
      //   }
      // }

      // if (angular.isUndefined(attrs.classes)) {
      //   scope.classes = '';
      // }

      // scope.select = function(evt) {
      //   if (!scope.disabled) {
      //     var index;
      //     for (var i = 0; i < tabsetCtrl.tabs.length; i++) {
      //       if (tabsetCtrl.tabs[i].tab === scope) {
      //         index = i;
      //         break;
      //       }
      //     }

      //     tabsetCtrl.select(index, evt);
      //   }
      // };

      // tabsetCtrl.addTab(scope);
      // scope.$on('$destroy', function() {
      //   tabsetCtrl.removeTab(scope);
      // });

      // //We need to transclude later, once the content container is ready.
      // //when this link happens, we're inside a tab heading.
      // scope.$transcludeFn = transclude;
    }
  };
}

export default {
  name: 'chatWindow',
  fn: chatWindow
};