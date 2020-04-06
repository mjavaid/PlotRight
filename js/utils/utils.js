const UTILS = (function() {
	const utils = {};

	utils.TIME = require("./time/time.js").default;

	utils.MARGIN = {
		'TOP': 50,
		'RIGHT': 50,
		'BOTTOM': 50,
		'LEFT': 50
	};

	utils.COLORS = [
		'#00876c',
		'#d43d51',
		'#fae684',
		'#f29553',
		'#86ba71',
	]

	return utils;
})();

export default UTILS;
