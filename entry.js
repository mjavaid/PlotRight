const PlotRight = require("./js/plotright.js").default;
const DEV_UTILS = require("./js/dev/utils.js").default;

(function() {
	
	const data = DEV_UTILS.generateData({min: 5, max: 50, n: 20});

	PlotRight.draw({ 
		data,
		selector: '#chart',
		title: 'Test Chart Title',
		category: function(d) { return d.x; },
		value: function(values) {
			let sum = 0;
			values.forEach(d => { sum += d.y});
			return sum;
		},
		axis: {
			x: {
				gridLines: false
			},
			y: {
				gridLines: true
			},
			gridLines: true
		}
	});

})();

