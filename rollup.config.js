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

const getCWBanner = filename => `/** @license ColorWings v1.1.0
* ${ filename }
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/`

let paths = []

const mainFEPaths = [{
	name: 'Greenlet',
	inputPath : 'src/frontend/js/scripts.js',
	outputPath: 'assets/js/scripts.js',
	outputMin : 'assets/js/scripts.min.js',
}]

const mainBEPaths = [{
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
}, {
	inputPath : 'library/addons/colorwings/pro/src/Pro.js',
	outputPath: 'library/addons/colorwings/pro/js/color-wings-pro.js',
	outputMin : 'library/addons/colorwings/pro/js/color-wings-pro.min.js',
	banner: getCWBanner( 'color-wings-pro.js' ),
}]

const proBEPaths = [{
	inputPath : 'library/pro/src/js/customizer/glpro-controls.js',
	outputPath: 'library/pro/assets/js/glpro-controls.js',
	outputMin : 'library/pro/assets/js/glpro-controls.min.js',
}, {
	inputPath : 'library/pro/src/js/preview/glpro-preview.js',
	outputPath: 'library/pro/assets/js/glpro-preview.js',
	outputMin : 'library/pro/assets/js/glpro-preview.min.js',
}, {
	inputPath : 'library/pro/src/js/options.js',
	outputPath: 'library/pro/assets/js/options.js',
	outputMin : 'library/pro/assets/js/options.min.js',
}]

const proFEPaths = [{
	name: "Masonry",
	inputPath : 'library/pro/src/js/masonry.js',
	outputPath: 'library/pro/assets/js/masonry.js',
	outputMin : 'library/pro/assets/js/masonry.min.js',
}]

if ( process.env.MAIN_FE === '1' || process.env.MAIN === '1' ) {
	paths = [ ...paths, ...mainFEPaths ]
}
if ( process.env.MAIN_BE === '1' || process.env.MAIN === '1' ) {
	paths = [ ...paths, ...mainBEPaths ]
}
if ( process.env.CW === '1' ) {
	paths = [ ...paths, ...cwPaths ]
}
if ( process.env.PRO_BE === '1' || process.env.PRO === '1' ) {
	paths = [ ...paths, ...proBEPaths ]
}
if ( process.env.PRO_FE === '1' || process.env.PRO === '1' ) {
	paths = [ ...paths, ...proFEPaths ]
}
if ( paths.length === 0 ) {
	paths = [ ...mainFEPaths, ...mainBEPaths, ...cwPaths, ...proFEPaths, ...proBEPaths ]
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
		commonjs( { transformMixedEsModules: true } ),
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' )
		}),
		scss({ output: false })
	]
}))

export default config
