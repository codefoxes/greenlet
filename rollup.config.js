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
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

const GLOBALS = {
	jQuery: 'jQuery',
	react: 'React',
	sortablejs: 'Sortable',
	'react-dom': 'ReactDOM',
}

const EXTERNAL = [
	'jQuery',
	'react',
	'react-dom',
	'React',
	'ReactDOM',
	'sortablejs',
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
}, {
	name: 'GreenletOptions',
	inputPath : 'src/backend/main/options/greenlet-options.js',
	outputPath: 'library/backend/assets/js/greenlet-options.js',
	outputMin : 'library/backend/assets/js/greenlet-options.min.js',
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
	outputMin : 'library/addons/colorwings/pro/js/color-wings-pro.min.js',
	banner: getCWBanner( 'color-wings-pro.js' ),
}]

const proBEPaths = [{
	inputPath : 'library/pro/src/js/customizer/glpro-controls.js',
	outputMin : 'library/pro/assets/js/glpro-controls.min.js',
}, {
	inputPath : 'library/pro/src/js/preview/glpro-preview.js',
	outputMin : 'library/pro/assets/js/glpro-preview.min.js',
}, {
	inputPath : 'library/pro/src/js/options.js',
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

const config = paths.map(( path ) => {
	const currentConf = {
		input: path.inputPath,
		output: [],
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
			scss({ output: false, outputStyle: 'compressed' })
		]
	}
	if ( 'outputPath' in path ) {
		currentConf.output.push({
			sourcemap: true,
			format: 'iife',
			name: ( 'name' in path ) ? path.name : 'app',
			file: path.outputPath,
			globals: GLOBALS,
			banner: ( 'banner' in path ) ? path.banner : ''
		})
	}
	if ( 'outputMin' in path ) {
		currentConf.output.push({
			sourcemap: ! path.outputPath,
			format: 'iife',
			name: ( 'name' in path ) ? path.name : 'app',
			file: path.outputMin,
			globals: GLOBALS,
			plugins: [terser()]
		})
	}
	return currentConf
} )

const cssPaths = [ {
	inputPath: 'src/frontend/css/root.scss',
	outputPath: 'assets/css/root.css',
	outputMin: 'assets/css/root.min.css',
	sourceMap: false,
}, {
	inputPath: 'src/frontend/css/default.scss',
	outputPath: 'assets/css/default.css',
	outputMin: 'assets/css/default.min.css',
}, {
	inputPath: 'src/frontend/css/styles.scss',
	outputPath: 'assets/css/styles.css',
	outputMin: 'assets/css/styles.min.css',
}, {
	inputPath: 'src/frontend/css/shop.scss',
	outputPath: 'assets/css/shop.css',
	outputMin: 'assets/css/shop.min.css',
}, {
	inputPath: 'src/frontend/css/bootstrap-extra.scss',
	outputPath: 'assets/css/bootstrap-extra.css',
	outputMin: 'assets/css/bootstrap-extra.min.css',
}, {
	inputPath: 'library/pro/src/css/styles.scss',
	outputPath: 'library/pro/assets/css/styles.css',
	outputMin: 'library/pro/assets/css/styles.min.css',
} ]

const defaultCssConfig = {
	output: { file: 'backup/dummy.js' },
	scssConfig: {
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: 1,
		sourceMap: false,
		processor: css => postcss( [ autoprefixer( { overrideBrowserslist: '> 1%', cascade: false } ) ] ),
		watch: [ 'src/frontend/css', 'library/pro/src/css' ],
	},
}

if ( process.env.CSS === '1' ) {
	config.length = 0
	cssPaths.forEach( ( path ) => {
		config.push( {
			input: path.inputPath,
			output: defaultCssConfig.output,
			plugins: [ scss( Object.assign( {}, defaultCssConfig.scssConfig, { output: path.outputPath, sourceMap: ( 'sourceMap' in path ) ? path.sourceMap : path.outputPath + '.map' } ) ) ]
		}, {
			input: path.inputPath,
			output: defaultCssConfig.output,
			plugins: [ scss( Object.assign( {}, defaultCssConfig.scssConfig, { output: path.outputMin, outputStyle: 'compressed' } ) ) ]
		} )
	} )
}

export default config
