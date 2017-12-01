const d3 = require('d3');

const UTILS = require('../utils/utils.js').default;

const Plotter = (function() {
	const plotter = {};

	const createSVG = function(conf) {
		const container = d3.select(conf.selector);

		conf.width = conf.width || container.node().clientWidth;
		conf.height = conf.height || 400;

		conf.chartWidth = conf.width - UTILS.MARGIN.LEFT - UTILS.MARGIN.RIGHT;
		conf.chartHeight = conf.height - UTILS.MARGIN.TOP - UTILS.MARGIN.BOTTOM;

		const svg = container.append('svg')
			.attr('width', conf.width)
			.attr('height', conf.height)
			.style('background-color', 'red');
		
		if (conf.title) {
			svg.append('g')
				.attr('width', conf.width)
				.classed('chart-title-group', true)
				.append('text')
					.text(conf.title)
					.attr('text-anchor', 'middle')
					.attr('alignment-baseline', 'middle')
					.attr('x', Math.floor(conf.width / 2))
					.attr('y', Math.floor(UTILS.MARGIN.TOP / 2))
					.style('font-weight', 'bold')
					.style('font-size', '2em')
					.style('font-family', 'Calibri')
					.classed('chart-title', true);
		}
		
		const chartGroup = svg.append('g')
			.attr('transform', `translate(${UTILS.MARGIN.LEFT}, ${UTILS.MARGIN.TOP})`);

		UTILS.svg = svg;
		UTILS.chartGroup = chartGroup;
	};

	const createAxis = function(conf) {
		const x = d3.scaleLinear().range([0, conf.chartWidth]);
		const y = d3.scaleLinear().range([conf.chartHeight, 0]);
		UTILS.chartProps.x = x;
		UTILS.chartProps.y = y;

		const axisX = d3.axisBottom(x);
		const axisY = d3.axisLeft(y);
		UTILS.chartProps.axisX = axisX;
		UTILS.chartProps.axisY = axisY;

		UTILS.chartGroup.append('g')
			.call(UTILS.chartProps.axisY);

		UTILS.chartGroup.append("g")
			.attr('transform', `translate(0,${conf.chartHeight})`)
			.call(UTILS.chartProps.axisX);

		console.log(UTILS.svg);
	}

	plotter.plot = function(conf) {
		console.log("PLOTTER:", conf);
		createSVG(conf);
		createAxis(conf);
	};

	return plotter;	
})();

export default Plotter;
