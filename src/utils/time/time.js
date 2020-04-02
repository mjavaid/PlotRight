const d3 = require("d3");

const TIME = (function() {
	const time = {};

	time.UNIT = {
		"H": {
			"brief": "H",
			"unit": "hour",
			"d3ref": "timeHour"
		},
		"D": {
			"brief": "D",
			"unit": "day",
			"d3ref": "timeDay"
		},
		"W": {
			"brief": "W",
			"unit": "week",
			"d3ref": "timeWeek"
		},
		"M": {
			"brief": "M",
			"unit": "month",
			"d3ref": "timeMonth"
		},
		"Y": {
			"brief": "Y",
			"unit": "year",
			"d3ref": "timeYear"
		}
	};

	time.rollup = function(date, unit) {
		unit = unit || time.UNIT.D;
		date = date || new Date();
		date = isNaN(date) ? date : new Date(date);

		return d3[unit.d3ref].floor(date);
	}

	return time;
})();

export default TIME;
