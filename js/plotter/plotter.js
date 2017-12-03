const d3 = require('d3');

const UTILS = require('../utils/utils.js').default;

const Plotter = (function() {
	const plotter = {};

	const createGridlines = function(conf, isX) {
		const axisX = UTILS.chartProps.axisX;
		const x = UTILS.chartProps.x;
		const axisY = UTILS.chartProps.axisY;
		const y = UTILS.chartProps.y;
		const xAxisTicks = axisX.scale().ticks(axisX.ticks()[0]);
		const yAxisTicks = axisY.scale().ticks(axisY.ticks()[0]);

		const lineFn = d3.line()
			.x(d => x(d[0]))
			.y(d => y(d[1]));

		const gridLinesGroup = UTILS.DOM_ELEMENTS.chartGroup
			.append('g')
				.classed('gridlines', true)
				.classed(isX ? 'x' : 'y', true);

		if (conf.axis[isX ? 'x' : 'y'].gridLines) {
			const axisLimits = d3.extent(isX ? yAxisTicks : xAxisTicks);
			xAxisTicks.filter((d, i) => i !== 0).forEach(d => {
				const data = axisLimits.map(lim => {
					if (isX) { return [d, lim]; }
					else { return [lim, d]; }
				});
				gridLinesGroup.append('path')
					.data([data])
					.classed('gridline', true)
					.classed(isX ? 'x' : 'y', true)
					.style('fill', 'none')
					.style('stroke', 'lightgrey')
					.style('stroke-width', '1px')
					.attr('d', lineFn);
			});
		}

		UTILS.DOM_ELEMENTS[isX ? 'xAxisGridLines' : 'yAxisGridLines'] = gridLinesGroup;
	}

	const createSVG = function(conf) {
		const container = d3.select(conf.selector)
			.classed('plot-right-chart', true);

		conf.width = conf.width || container.node().clientWidth;
		conf.height = conf.height || 400;

		conf.chartWidth = conf.width - UTILS.MARGIN.LEFT - UTILS.MARGIN.RIGHT;
		conf.chartHeight = conf.height - UTILS.MARGIN.TOP - UTILS.MARGIN.BOTTOM;

		const svg = container.append('svg')
			.attr('width', conf.width)
			.attr('height', conf.height);
		
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

		UTILS.DOM_ELEMENTS.svg = svg;
		UTILS.DOM_ELEMENTS.chartGroup = chartGroup;
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

		UTILS.DOM_ELEMENTS.chartGroup.append('g')
			.classed('axis', true)
			.classed('y', true)
			.classed('left', true)
			.call(UTILS.chartProps.axisY);

		UTILS.DOM_ELEMENTS.chartGroup.append('g')
			.attr('transform', `translate(0,${conf.chartHeight})`)
			.classed('axis', true)
			.classed('x', true)
			.classed('bottom', true)
			.call(UTILS.chartProps.axisX);

		console.log(UTILS.DOM_ELEMENTS.svg);
	}

	plotter.plot = function(conf) {
		console.log('PLOTTER:', conf);
		
		conf.axis = conf.axis || {};
		conf.axis.x = conf.axis.x || {};
		conf.axis.y = conf.axis.y || {};
		if (conf.axis.gridLines) {
			conf.axis.x.gridLines = true;
			conf.axis.y.gridLines = true;
		} else {
			conf.axis.x.gridLines = conf.axis.x.gridLines === undefined ? true : conf.axis.x.gridLines;
			conf.axis.y.gridLines = conf.axis.y.gridLines === undefined ? true : conf.axis.y.gridLines;
		}

		createSVG(conf);
		createAxis(conf);
		createGridlines(conf, true);
		createGridlines(conf);
	};

	return plotter;	
})();

export default Plotter;
