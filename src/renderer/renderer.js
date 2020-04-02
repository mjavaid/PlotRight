const LineRenderer = require('./line/line-renderer.js').default;
const BarRenderer = require('./bar/bar-renderer.js').default;
const UTILS = require('./../utils/utils.js').default;

// interface RenderPlugin {}

const Renderer = (function() {
	const renderer = {};

	const RENDER_PLUGINS = {};

	renderer.registerRenderer = function(plugin) {
		RENDER_PLUGINS[plugin.type] = plugin;
	}

	renderer.render = function(chart) {
		console.log("RENDERER:", chart);

		if (RENDER_PLUGINS.hasOwnProperty(chart.type)) {
			RENDER_PLUGINS[chart.type].draw(chart);
		} else {
			RENDER_PLUGINS[UTILS.TYPES.LINE].draw(chart);
		}

		switch(chart.type) {
			case UTILS.TYPES.BAR:
				BarRenderer.draw(chart);
				return;
			case UTILS.TYPES.LINE:
			default:
				LineRenderer.draw(chart);
		}
	};

	return renderer;
})();

export default Renderer;
