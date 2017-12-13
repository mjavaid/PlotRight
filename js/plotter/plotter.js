const d3 = require('d3');

const UTILS = require('../utils/utils.js').default;

const Plotter = (function() {
	const plotter = {};

	const createGridlines = function(chart, isX) {
		const conf = chart.conf;
		const axisX = chart.chartProps.axisX;
		const x = chart.chartProps.x;
		const axisY = chart.chartProps.axisY;
		const y = chart.chartProps.y;
		const xAxisTicks = x.domain();
		const yAxisTicks = y.ticks(axisY.ticks()[0]);

		const xTickDistance = x.bandwidth() / 2;

		const lineFn = d3.line()
			.x(d => isX ? (x(d[0]) + xTickDistance) : d[0])
			.y(d => y(d[1]));

		const gridLinesGroup = chart.DOM_ELEMENTS.chartGroup
			.append('g')
				.classed('gridlines', true)
				.classed(isX ? 'x' : 'y', true);

		if (conf.axis[isX ? 'x' : 'y'].gridLines) {
			const axisLimits = isX ? d3.extent(yAxisTicks) : [0, chart.conf.chartWidth];
			const axisTicks = isX ? xAxisTicks : yAxisTicks;
			axisTicks.filter((d, i) => isX || i !== 0).forEach(d => {
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

		chart.DOM_ELEMENTS[isX ? 'xAxisGridLines' : 'yAxisGridLines'] = gridLinesGroup;
	}

	const createSVG = function(chart) {
		const conf = chart.conf;
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

		chart.DOM_ELEMENTS.svg = svg;
		chart.DOM_ELEMENTS.chartGroup = chartGroup;
	};

	const createAxis = function(chart) {
		const timeFormat = d3.timeFormat('%d-%m-%Y');
		const conf = chart.conf;
		const x = d3.scaleBand()
			.rangeRound([0, conf.chartWidth])
			.padding(0.1)
			.domain(chart.data.sort((x, y) => +x.key - +y.key).map(d => timeFormat(new Date(+d.key))));
		const y = d3.scaleLinear()
			.range([conf.chartHeight, 0])
			.domain([0, d3.max(chart.data.map(d => d.value))])
			.nice();
		chart.chartProps.x = x;
		chart.chartProps.y = y;

		const axisX = d3.axisBottom(x);
		const axisY = d3.axisLeft(y);
		chart.chartProps.axisX = axisX;
		chart.chartProps.axisY = axisY;

		chart.DOM_ELEMENTS.chartGroup.append('g')
			.classed('axis', true)
			.classed('y', true)
			.classed('left', true)
			.call(chart.chartProps.axisY);

		chart.DOM_ELEMENTS.chartGroup.append('g')
			.attr('transform', `translate(0,${conf.chartHeight})`)
			.classed('axis', true)
			.classed('x', true)
			.classed('bottom', true)
			.call(chart.chartProps.axisX);
	}

	plotter.plot = function(chart) {
		console.log('PLOTTER:', chart.conf);
		const conf = chart.conf;
		
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

		createSVG(chart);
		createAxis(chart);
		createGridlines(chart, true);
		createGridlines(chart);
	};

	return plotter;	
})();

export default Plotter;
