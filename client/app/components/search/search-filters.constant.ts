export const SEARCH_FILTERS = {
	typeFilters: [{
		label:'Virtual Tour',
		value:'tour'
	},{
		label:'Campus Map',
		value:'map'
	}],
	modelFilters: {
		tour: [{
			label:'Buildings',
			value:'buildings'
		},{
			label:'Tour scenes',
			value:'scenes'
		}],
		map: [{
			label:'Map features',
			value:'features'
		},{
			label:'Feature collections',
			value:'collections'
		}]
	},
	fieldFilters: [{
		label:'Name',
		value:'name,label'
	},{
		label:'Description',
		value:'desc'
	},{
		label:'Acronym',
		value:'code'
	}]
};