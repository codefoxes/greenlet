import { $ } from '../Helpers'
import styles from '../greenlet-controls.scss'

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)

const style = document.createElement( 'style' )
style.id = 'greenlet-controls'
style.innerHTML = styles
document.body.appendChild( style )
