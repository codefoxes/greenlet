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

const getCWBanner = filename => `/** @license ColorWings v1.0.0
* ${ filename }
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/`

const paths = [{
	inputPath : 'src/backend/main/customizer/greenlet-controls.js',
	outputPath: 'library/backend/assets/js/greenlet-controls.js',
	outputMin : 'library/backend/assets/js/greenlet-controls.min.js',
}, {
	inputPath : 'src/backend/colorwings/customizer/ColorWings.js',
	outputPath: 'library/addons/colorwings/js/color-wings.js',
	outputMin : 'library/addons/colorwings/js/color-wings.min.js',
	banner: getCWBanner( 'color-wings.js' ),
}, {
	inputPath : 'src/backend/colorwings/preview/colorWings.js',
	outputPath: 'library/addons/colorwings/js/color-wings-preview.js',
	outputMin : 'library/addons/colorwings/js/color-wings-preview.min.js',
	banner: getCWBanner( 'color-wings-preview.js' ),
}]

const config = paths.map(( path ) => ({
	input: path.inputPath,
	output: [{
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: path.outputPath,
		globals: GLOBALS,
		banner: ( 'banner' in path ) ? path.banner : ''
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
