function keyboardShortcut($window) {
	'ngInject';
  return function(str) {
    if (!str) return;
    const keys = str.split('-');
    const isOSX = /Mac OS X/.test($window.navigator.userAgent);

    const seperator = (!isOSX || keys.length > 2) ? '+' : '';

    const abbreviations = {
      M: isOSX ? '⌘' : 'Ctrl',
      A: isOSX ? 'Option' : 'Alt',
      S: 'Shift'
    };

    return keys.map(function(key, index) {
      const last = index == keys.length - 1;
      return last ? key : abbreviations[key];
    }).join(seperator);
  };
}

export default {
  name: 'keyboardShortcut',
  fn: keyboardShortcut
};