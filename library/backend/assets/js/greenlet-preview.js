/**
 * Greenlet Customizer Preview.
 *
 * @package greenlet\library\backend\assets\js
 */

(function( $ ) {
	if ( ! wp || ! wp.customize ) {
		return;
	}

	wp.customize(
		'logo_width',
		function ( value ) {
			var logo = document.querySelector( '.site-logo img' )
			value.bind(
				function ( to ) {
					if ( logo !== null ) {
						logo.style.width = to + 'px';
					}
				}
			);
		}
	)

	wp.customize(
		'logo_height',
		function ( value ) {
			var logo = document.querySelector( '.site-logo img' )
			value.bind(
				function ( to ) {
					if ( logo !== null ) {
						logo.style.height = to + 'px';
					}
				}
			);
		}
	)
})( jQuery );
