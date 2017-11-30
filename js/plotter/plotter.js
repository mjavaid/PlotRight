const d3 = require('d3');

const UTILS = require('../utils/utils.js').default;

const Plotter = (function() {
	const plotter = {};

	const createSVG = function(selector, width, height) {
		const container = d3.select(selector);

		width = width || container.node().clientWidth;
		height = height || 400;
		const svg = container.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background-color', 'red');

		UTILS.svg = svg;
	};

	const createAxis = function() {
		console.log(UTILS.svg);
	}

	plotter.plot = function(conf) {
		console.log("PLOTTER:", conf);
		createSVG(conf.selector, conf.width, conf.height);
		createAxis();
	};

	return plotter;	
})();

export default Plotter;
