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

// wp.customize.bind('ready', function () {
// 	const api = wp.customize
//
// 	api.section.add(
// 		new api.Section('extra_styles', {
// 			title: 'Extra Styles',
// 			panel: '',
// 			customizeAction: 'Customizing ▸ Extra Styles',
// 			priority: 2000
// 		})
// 	);
//
// 	api.add( new api.Setting( 'extra_css', '', {
// 		transport: 'postMessage',
// 		previewer: api.previewer,
// 	} ) );
//
// 	api.control.add(
// 		new api.Control('extra_css_control', {
// 			setting: 'extra_css',
// 			type: 'textarea',
// 			section: 'extra_styles',
// 			label: 'Extra CSS'
// 		})
// 	);
//
// 	api.section( 'extra_styles', function( section ) {
// 		section.expanded.bind( function( isExpanded ) {
// 			if ( isExpanded ) {
// 				api.state( 'paneVisible' ).set( false );
// 				api.previewer.send( 'init-wings', true );
// 			} else {
// 				console.log( ' Is collapsed')
// 			}
// 		} );
// 	} );
//
// 	api.previewer.bind( 'test-event', ( data ) => {
// 		console.log( `Got message from preview: ${data}` )
// 	});
//
// 	wp.customize.previewer.bind(
// 		'ready',
// 		function() {
// 			const iframe = document.querySelector( '#customize-preview iframe' )
// 			console.log(iframe)
// 			if ( iframe !== null ) {
// 				console.log(iframe.contentWindow)
// 			}
// 		}
// 	)
// });
