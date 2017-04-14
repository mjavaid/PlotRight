const d3 = require("d3");

const PlotRight = (function() {

	const lib = {};
	
	lib.draw = function() {
		if(!d3) {
			console.error("DEPENDENCY: D3 not available!");
			return;
		}

		console.info("DRAW");
	};

	return lib;

})();

export default PlotRight;
