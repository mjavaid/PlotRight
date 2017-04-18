const DEV_UTILS = (function() {

	const utils = {};

	utils.randomNumber = function(min, max) {
		return Math.floor((Math.random() * (max - min))+ min);
	};

	utils.generateData = function(min, max, n) {
		n = n || 10;
		const data = [];
		for(let i = 0; i < n; i++) {
			data.push(utils.randomNumber(min, max));
		}

		return data;
	};

	return utils;

})();

export default DEV_UTILS;