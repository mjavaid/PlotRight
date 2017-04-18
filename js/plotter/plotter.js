const Plotter = (function() {
	const plotter = {};

	plotter.plot = function(conf) {
		console.log("PLOTTER:", conf);
	};

	return plotter;	
})();

export default Plotter;
