const LineRenderer = require('./line/line-renderer.js').default;
const UTILS = require('./../utils/utils.js').default;

const Renderer = (function() {
	const renderer = {};

	renderer.render = function(chart) {
		console.log("RENDERER:", chart);

		switch(chart.type) {
			case UTILS.TYPES.LINE:
			default:
			LineRenderer.draw(chart);
		}
	};

	return renderer;
})();

export default Renderer;
