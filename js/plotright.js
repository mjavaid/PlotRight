const d3 = require("d3");

const Plotter = require("./plotter/plotter.js").default;
const Renderer = require("./renderer/renderer.js").default;

const PlotRight = (function() {

	const lib = {};
	
	lib.draw = function(conf) {
		if(!d3) {
			console.error("DEPENDENCY: D3 not available!");
			return;
		}

		console.info("PlotRight - DRAW", conf);

		Plotter.plot({});
		Renderer.render({});
	};

	return lib;

})();

export default PlotRight;
