const Renderer = (function() {
	const renderer = {};

	renderer.render = function(conf) {
		console.log("RENDERER:", conf);
	};

	return renderer;
})();

export default Renderer;
