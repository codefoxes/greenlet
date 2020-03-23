/**
 * Rollup config.
 *
 * @package greenlet
 */

import babel from 'rollup-plugin-babel'
import { terser } from "rollup-plugin-terser";

const inputPath  = 'src/backend/greenlet-controls.js'
const outputPath = 'library/backend/assets/js/greenlet-controls.js'
const outputMin  = 'library/backend/assets/js/greenlet-controls.min.js'

const GLOBALS = {
	jQuery: 'jQuery',
	react: 'React',
	'react-dom': 'ReactDOM'
}

const EXTERNAL = [
	'jQuery',
	'react',
	'react-dom',
]

const config = {
	input: inputPath,
	output: [{
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: outputPath,
		globals: GLOBALS,
	}, {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: outputMin,
		globals: GLOBALS,
		plugins: [terser()]
	}],
	external: EXTERNAL,
	plugins: [
		babel(
			{
				exclude: 'node_modules/**',
			}
		)
	]
}

export default config
