import { $ } from '../Helpers'

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)
