/**
 * Setup Color Wings.
 */

import './global/Setup'

import './global/StylesHandler'
import './components/editor/EditorHandler'

import Editor from './components/editor/Editor'
import styles from './ColorWings.scss'

function Canvas () {
	return (
		<div id="cw-canvas" >
			<Editor />
			<style type="text/css">{ styles }</style>
		</div>
	)
}

wp.customize.controlConstructor['color-wings'] = wp.customize.Control.extend(
	{
		ready: () => {
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
