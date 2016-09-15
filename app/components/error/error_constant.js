const ERROR_SUGGESTIONS = [
	{
		title: `
Clear your <md-select 
	style="display:inline-block;min-width:130px;"
	ng-model="item.params"
	placeholder="browser"
	class="md-no-underline">
  <md-option value="gc">Google Chrome</md-option>
  <md-option value="ie">Internet Explorer</md-option>
  <md-option value="ff">Firefox</md-option>
  <md-option value="sa">Safari</md-option>
  <md-option value="op">Opera</md-option>
  <md-option value="other">Other browser</md-option>
</md-select> cache`,
		desc: 'Clearing your browser cache is a non-invasive troubleshooting step that resolves many simple web issues.',
		icon: 'delete_forever',
		action: function (browser) {
			let url = 'http://www.refreshyourcache.com';
			switch (browser) {
				case 'gc':
					url = 'https://support.google.com/accounts/answer/32050';
					break;
				case 'ie':
					url = 'https://support.microsoft.com/en-us/kb/260897';
					break;
				case 'ff':
					url = 'https://support.mozilla.org/en-US/kb/how-clear-firefox-cache';
					break;
				case 'sa':
					url = 'https://support.apple.com/en-us/HT204098';
					break;
				case 'op':
					url = 'http://help.opera.com/opera/Windows/2256/en/private.html#deleteData';
					break;
				default:
					break;
			}
			window.open(url,'_blank');
		}
	},{
		title: 'Wait a little while and try again',
		desc: 'The server is busy or not responding; this usually resolves itself after a short amount of time.',
		icon: 'hourglass_empty'
	},{
		title: 'Adjust the tour data usage settings',
		desc: 'If the tour is taking too long to load, you can customize its loading behaviour to better suit your situation.',
		icon: 'data_usage',
		goToSettings: true
	}
];

export default {
  name: 'ERROR_SUGGESTIONS',
  fn: ERROR_SUGGESTIONS
};

