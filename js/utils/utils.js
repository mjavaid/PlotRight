const UTILS = (function() {
	const utils = {};

	utils.TIME = require("./time/time.js").default;

	utils.MARGIN = {
		'TOP': 50,
		'RIGHT': 50,
		'BOTTOM': 50,
		'LEFT': 50
	};

	utils.DOM_ELEMENTS = {};

	utils.chartProps = {};

	return utils;
})();

export default UTILS;
