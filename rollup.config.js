/**
 * Rollup config.
 *
 * @package greenlet
 */

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from "rollup-plugin-terser"
import scss from 'rollup-plugin-scss'

const GLOBALS = {
	jQuery: 'jQuery',
	react: 'React',
	'react-dom': 'ReactDOM',
}

const EXTERNAL = [
	'jQuery',
	'react',
	'react-dom',
	'React',
	'ReactDOM',
]

const getCWBanner = filename => `/** @license ColorWings v1.0.0
* ${ filename }
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/`

let paths

const mainPaths = [{
	inputPath : 'src/backend/main/customizer/greenlet-controls.js',
	outputPath: 'library/backend/assets/js/greenlet-controls.js',
	outputMin : 'library/backend/assets/js/greenlet-controls.min.js',
}, {
	inputPath : 'src/backend/main/preview/greenlet-preview.js',
	outputPath: 'library/backend/assets/js/greenlet-preview.js',
	outputMin : 'library/backend/assets/js/greenlet-preview.min.js',
}, {
	inputPath : 'src/backend/main/editor/greenlet-meta.js',
	outputPath: 'library/backend/assets/js/greenlet-meta.js',
	outputMin : 'library/backend/assets/js/greenlet-meta.min.js',
}]

const cwPaths = [{
	name: 'Colorwings',
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

const proPaths = [{
	inputPath : 'library/pro/src/js/customizer/glpro-controls.js',
	outputPath: 'library/pro/assets/js/glpro-controls.js',
	outputMin : 'library/pro/assets/js/glpro-controls.min.js',
}]

if ( process.env.ONLY_MAIN === '1' ) {
	paths = mainPaths
} else if ( process.env.ONLY_CW === '1' ) {
	paths = cwPaths
} else if ( process.env.ONLY_PRO === '1' ) {
	paths = proPaths
} else {
	paths = [ ...mainPaths, ...cwPaths, ...proPaths ]
}

const config = paths.map(( path ) => ({
	input: path.inputPath,
	output: [{
		sourcemap: true,
		format: 'iife',
		name: ( 'name' in path ) ? path.name : 'app',
		file: path.outputPath,
		globals: GLOBALS,
		banner: ( 'banner' in path ) ? path.banner : ''
	}, {
		sourcemap: false,
		format: 'iife',
		name: ( 'name' in path ) ? path.name : 'app',
		file: path.outputMin,
		globals: GLOBALS,
		plugins: [terser()]
	}],
	external: EXTERNAL,
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
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
