/**
 * Setup Color Wings.
 */

wp.customize.bind('ready', function () {
	const api = wp.customize

	api.section.add(
		new api.Section('extra_styles', {
			title: 'Extra Styles',
			panel: '',
			customizeAction: 'Customizing ▸ Extra Styles',
			priority: 2000
		})
	);

	api.add( new api.Setting( 'extra_css', '', {
		transport: 'postMessage',
		previewer: api.previewer,
	} ) );

	api.control.add(
		new api.Control('extra_css_control', {
			setting: 'extra_css',
			type: 'textarea',
			section: 'extra_styles',
			label: 'Extra CSS'
		})
	);

	api.section( 'extra_styles', function( section ) {
		section.expanded.bind( function( isExpanded ) {
			if ( isExpanded ) {
				api.state( 'paneVisible' ).set( false );
				api.previewer.send( 'init-wings', true );
			} else {
				console.log( ' Is collapsed')
			}
		} );
	} );

	api.previewer.bind( 'test-event', ( data ) => {
		console.log( `Got message from preview: ${data}` )
	});
});
