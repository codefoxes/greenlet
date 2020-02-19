/**
 * Greenlet Customizer Controls.
 *
 * @package greenlet
 */

(function( $ ) {

	$( window ).on(
		'load',
		function() {
			$( 'html' ).addClass( 'window-loaded' );
		}
	);

	require( './controls/multicheck' );

	require( './controls/radio-image' );

	require( './controls/template-selector' );

	require( './controls/range' );

	require( './controls/color' );

	require( './controls/border' );

	require( './controls/font' );

	require( './controls/dependencies' );

})( jQuery );
