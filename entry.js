const PlotRight = require("./js/plotright.js").default;
const DEV_UTILS = require("./js/dev/utils.js").default;

(function() {

	const data = DEV_UTILS.generateData(5, 50, 20);

	PlotRight.draw({ data });

})();

