const PlotRight = require('./src/plotright.js').default;
const DEV_UTILS = require('./src/dev/utils.js').default;

(function() {
	
	const data = DEV_UTILS.generateData({min: 5, max: 50, n: 20});

	const chart = PlotRight.draw({
		data,
		type: PlotRight.TYPE.LINE,
		selector: '#chart',
		title: 'Test Chart Title',
		category: function(d) { return d.x; },
		value: function(values) {
			let sum = 0;
			values.forEach(d => { sum += d.y});
			return sum;
		},
		elements: {
			dataPoints: {
				fill: 'white'
			}
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

	console.log(chart);

})();

