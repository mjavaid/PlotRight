const d3 = require('d3');

const Plotter = require('./plotter/plotter.js').default;
const Renderer = require('./renderer/renderer.js').default;
const Chart = require('./chart/chart.js').default;

const UTILS = require('./utils/utils.js').default;

const PlotRight = (function() {

	const lib = {};

	lib.TYPE = Renderer.TYPES;

	const processData = function(conf) {
		let data = [...conf.data];
		const seriesFn = conf.series || ((d) => 'series1');
		data.forEach(d => {
			d.category = +UTILS.TIME.rollup(conf.category(d), conf.granularity).getTime();
			d.series = seriesFn(d);
		});

		console.log(JSON.stringify(data));

		data = d3.nest()
			.key(d => d.series)
			.key(d => d.category)
			.sortKeys(d3.ascending)
			.rollup(conf.value)
			.entries(conf.data);

		const categories = [...(new Set(data.reduce((acc, s) => {
			return acc.concat(s.values.map(d => d.key));
		}, [])))];
		const values = [...(new Set(data.reduce((acc, s) => {
			return acc.concat(s.values.map(d => d.value));
		}, [])))];

		data.forEach((s, i) => {
			s.color = UTILS.COLORS[i % UTILS.COLORS.length];
		});

		console.log('SETS:', categories, values);

		conf.dataProps = {
			categories, values
		};

		return data;
	};
	
	lib.draw = function(conf) {
		if(!d3) {
			console.error('DEPENDENCY: D3 not available!');
			return;
		}

		console.info("PlotRight - DRAW", conf);

		const chart = new Chart(conf);
		chart.data = processData(conf);
		console.log("DATA:", chart.data);

		Plotter.plot(chart);
		Renderer.render(chart);

		return chart;
	};

	return lib;

})();

export default PlotRight;
