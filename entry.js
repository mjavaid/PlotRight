import PlotRight from './js/plotright';
import DEV_UTILS from './js/dev/utils';

// Renderers
require('./js/renderer/bar/bar-renderer.js').default;
require('./js/renderer/line/line-renderer.js').default;

(function() {
	
	const data = DEV_UTILS.generateData({min: 5, max: 50, n: 20, series: ['series1', 'series2', 'series3']});

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
		series: function(d) { return d.series; },
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

