module.exports = {
	entry: './entry.js',
	output: {
		path: __dirname + '/target/',
		filename: 'plotright.bundle.js'
	},
	optimization: {
		minimize: false
	},
	externals: {
		'd3': 'd3'
	}
};
