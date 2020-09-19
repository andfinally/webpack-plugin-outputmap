const { resolve } = require('path');
const fs = require('fs');

/**
 * Creates a file with a JSON object mapping entry names to asset names.
 * We can use the map to enqueue files whose names contain a content hash.
 */
module.exports = class OutputMapPlugin {
	constructor(options) {
		this.options = options;
	}
	apply(compiler) {
		compiler.hooks.done.tap('OutputMapPlugin', (stats) => {
			const map = {};
			// [ 'blocks/index.98a08c137038f434e9ed.min.js', 'blocks/validation.468fdc39c28306626e0d.min.js' ]
			const assets = Object.keys(stats.compilation.assets);
			assets.forEach((asset) => {
				const re = /^([\w\/]+)(\.[a-z0-9]+)(\.min\.js)$/gi;
				const key = asset.replace(re, '$1$3');
				map[key] = asset;
			});
			fs.writeFile('./dist/map.json', JSON.stringify(map), (error, data) => {
				if (error) {
					return console.log(error);
				}
			});
		});
	}
};
