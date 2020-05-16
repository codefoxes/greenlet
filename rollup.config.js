/**
 * Rollup config.
 *
 * @package greenlet
 */

import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from "rollup-plugin-terser"
import scss from 'rollup-plugin-scss'

const GLOBALS = {
	jQuery: 'jQuery',
	react: 'React',
	'react-dom': 'ReactDOM'
}

const EXTERNAL = [
	'jQuery',
	'react',
	'react-dom',
	'React',
	'ReactDOM'
]

const paths = [{
	inputPath : 'src/backend/js/customizer/greenlet-controls.js',
	outputPath: 'library/backend/assets/js/greenlet-controls.js',
	outputMin : 'library/backend/assets/js/greenlet-controls.min.js',
}, {
	inputPath : 'src/backend/js/preview/greenlet-preview.js',
	outputPath: 'library/backend/assets/js/greenlet-preview.js',
	outputMin : 'library/backend/assets/js/greenlet-preview.min.js',
}]

const config = paths.map(( path ) => ({
	input: path.inputPath,
	output: [{
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: path.outputPath,
		globals: GLOBALS,
	}, {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: path.outputMin,
		globals: GLOBALS,
		plugins: [terser()]
	}],
	external: EXTERNAL,
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		resolve({
			browser: true,
		}),
		commonjs(),
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' )
		}),
		scss({ output: false })
	]
}))

export default config
