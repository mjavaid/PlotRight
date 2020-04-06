const DEV_UTILS = (function() {

	const utils = {};

	utils.randomNumber = function(min, max) {
		return Math.floor((Math.random() * (max - min))+ min);
	};

	utils.generateData = function(settings) {
		settings = settings || {};
		settings.series = settings.series || ['series1'];
		settings.min = settings.min || 0;
		settings.max = settings.max || 100;
		settings.n = settings.n || 10;
		settings.to = settings.to || (new Date()).getTime();
		settings.from = settings.from || (settings.to - (14 * 24 * 60 * 60 * 1000));

		const data = [];
		settings.series.forEach((series) => {
			for(let i = 0; i < settings.n; i++) {
				data.push({
					'y': utils.randomNumber(settings.min, settings.max),
					'x': utils.randomNumber(settings.from, settings.to),
					'series': series
				});
			}
		});

		return data;
	};

	return utils;

})();

export default DEV_UTILS;