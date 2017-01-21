const EDITOR_MESSAGES = {
	confirm: {
		textContent: 'Are you sure?',
		action: 'Confirm',
		highlightAction: true,
		highlightClass: 'md-warn',
		position: 'bottom left',
		hideDelay: 0
	},
	itemRemoved: {
		textContent: 'Item removed!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	itemAdded: {
		textContent: 'Item added!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftLoaded: {
		textContent: 'Draft loaded!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	saveDraft: {
		textContent: 'Draft saved!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftFound: {
		textContent: 'Saved drafts found!',
		action: 'Load most recent',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	publish: {
		textContent: 'Changes published!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 5000
	},
	discardDraft: {
		textContent: 'Draft discarded!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 1000
	},
	revertToDraft: {
		textContent: 'Reverted to last draft!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 2000
	}
}

export default {
  name: 'EDITOR_MESSAGES',
  fn: EDITOR_MESSAGES
};

