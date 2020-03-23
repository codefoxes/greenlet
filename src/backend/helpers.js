/**
 * Greenlet Helpers.
 *
 * @package greenlet
 */

export const $ = jQuery

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)

export const gl = {
	debounce: function debounce( wait, func, immediate ) {
		var timeout
		return function() {
			var context = this, args = arguments
			var later   = function() {
				timeout = null;
				if ( ! immediate ) {
					func.apply( context, args )
				}
			}
			var callNow = immediate && ! timeout
			clearTimeout( timeout )

			timeout = setTimeout( later, wait )
			if ( callNow ) {
				func.apply( context, args )
			}
		}
	}
}
