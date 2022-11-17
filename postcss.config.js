const postcssPresetEnv = require('postcss-preset-env');
//enable postcss-import and postcss-preset-env
module.exports = {
	plugins: [
		require('postcss-import'),
		postcssPresetEnv({ stage: 0 })
	]
}