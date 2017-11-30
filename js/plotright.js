const d3 = require("d3");

const Plotter = require("./plotter/plotter.js").default;
const Renderer = require("./renderer/renderer.js").default;

const UTILS = require("./utils/utils.js").default;

const PlotRight = (function() {

	const lib = {};

	const processData = function(conf) {
		let data = [...conf.data];
		data.forEach(d => {
			d.category = UTILS.TIME.rollup(conf.category(d), conf.granularity).getTime();
		});

		console.log(JSON.stringify(data));

		data = d3.nest()
			.key(function(d) { return d.category; })
			.rollup(conf.value)
			.entries(conf.data);

		return data;
	};
	
	lib.draw = function(conf) {
		if(!d3) {
			console.error("DEPENDENCY: D3 not available!");
			return;
		}

		console.info("PlotRight - DRAW", conf);

		const chartData = processData(conf);
		console.log("DATA:", chartData);

		Plotter.plot(conf);
		Renderer.render(conf);
	};

	return lib;

})();

export default PlotRight;
