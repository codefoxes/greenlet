import { $ } from '../Helpers'
import popupStyles from './components/Popup/Popup.scss'
import styles from '../greenlet-controls.scss'

$( window ).on(
	'load',
	function() {
		$( 'html' ).addClass( 'window-loaded' );
	}
)

const style = document.createElement( 'style' )
style.id = 'greenlet-controls'
style.innerHTML = `${ popupStyles } ${ styles }`
document.body.appendChild( style )
