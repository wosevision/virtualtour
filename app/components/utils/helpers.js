export class Uid {
	constructor() {
		return this;
	}
	fromDate() {
   const dateObject = new Date();
   const uniqueId = `${ dateObject.getFullYear() }${ dateObject.getMonth() }${ dateObject.getDate() }${ dateObject.getTime() }`;
   return uniqueId;
	}
};