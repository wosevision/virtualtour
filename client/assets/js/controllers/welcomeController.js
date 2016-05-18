angular.module('controllers')
  .controller('welcomeController', ['$scope', function($scope) {
  	$scope.IntroOptions = {
      steps: [
        {
          element: document.querySelector('#welcomeStep1'),
          intro: "This is the first tooltip.",
          position: 'auto'
        },
        {
          element: document.querySelectorAll('#welcomeStep2')[0],
          intro: "<strong>You</strong> can also <em>include</em> HTML",
          position: 'auto'
        },
        {
          element: '#welcomeStep3',
          intro: 'More features, more fun.',
          position: 'auto'
        }
      ],
        showStepNumbers: false,
        showProgress: true,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        keyboardNavigation: true,
        nextLabel: 'What\'s next?',
        prevLabel: '<span style="color:green">Go back</span>',
        skipLabel: 'Got it!',
        doneLabel: 'Finish'
    };
  }]);
