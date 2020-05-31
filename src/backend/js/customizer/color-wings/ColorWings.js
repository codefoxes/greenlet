/**
 * Setup Color Wings.
 */

import './global/Setup'
import './global/MainHandler'
import './components/Editor/EditorHandler'

import Canvas from './components/Canvas/Canvas'

wp.customize.controlConstructor['color-wings'] = wp.customize.Control.extend(
	{
		ready: function() {
			const control = this
			cw.Evt.emit( 'colorwings-will-mount', control )
			ReactDOM.render( <Canvas />, document.getElementById( 'color-wings' ) )

			wp.customize.section( 'extra_styles', function( section ) {
				section.expanded.bind( function( isExpanded ) {
					if ( isExpanded ) {
						// api.state( 'paneVisible' ).set( false )
						cw.Evt.emit( 'mount-colorwings' )
					} else {
						cw.Evt.emit( 'unmount-colorwings' )
					}
				} )
			} )

			cw.Evt.on( 'update-control', ( currentStylesDetails ) => {
				console.log( currentStylesDetails )
				// Todo: Append current style details to the settings
				control.setting.set( currentStylesDetails )
			} )
		}
	}
)
