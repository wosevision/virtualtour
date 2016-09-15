class $ErrorReporter {
	constructor($mdDialog) {
		this.$mdDialog = $mdDialog;
	}
	error(locals = null) {
		this.$mdDialog.show(
			this.$mdDialog.error({ locals })
		);
	}
}

$ErrorReporter.$inject = ['$mdDialog'];

export default {
  name: '$ErrorReporter',
  fn: $ErrorReporter
};