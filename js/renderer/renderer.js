const Renderer = (function() {
	const renderer = {
		TYPES: {}
	};

	const RENDER_ENGINES = {};

	renderer.register = function(engine) {
		console.log('REGISTERING ...', engine);
		if (RENDER_ENGINES[engine.type]) {
			console.error(`Render Engine with type [${engine.type}] already registered`);
			return false;
		}

		RENDER_ENGINES[engine.type] = engine;
		renderer.TYPES[engine.type] = engine.type;
		console.log('REGISTERED!', engine, RENDER_ENGINES);
		return true;
	}

	renderer.render = function(chart) {
		console.log("RENDERER:", chart, RENDER_ENGINES);

		if (RENDER_ENGINES[chart.type]) {
			RENDER_ENGINES[chart.type].draw(chart);
		} else {
			console.error(`Unknown render type [${chart.type}] provided`);
		}
	};

	return renderer;
})();

export default Renderer;
