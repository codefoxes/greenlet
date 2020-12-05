/**
 * Custom scripts needed for options.
 *
 * @package greenlet\library\backend\assets\js
 */

import styles from './greenlet-options.scss'

/**
 * Show Temporary Message.
 *
 * @param {string|Element} selector Class Name.
 * @param {number}         delay    Delay in microseconds.
 * @param {string|bool}    message  Message HTML or text.
 */
function showTemporaryMessage( selector, delay = 5000, message = false ) {
	if ( 'string' === typeof selector ) {
		selector = document.querySelector( selector )
	}
	if ( false !== message ) {
		selector.innerHTML = message
	}

	selector.classList.add( 'show' );
	setTimeout( () => selector.classList.remove( 'show' ), delay )
}

function domReady(callback) {
	if ( document.readyState === 'complete' || document.readyState === 'interactive' ) return void callback()
	document.addEventListener('DOMContentLoaded', callback)
}

function addStyles() {
	const style = document.createElement( 'style' )
	style.id = 'greenlet-options'
	style.innerHTML = styles
	document.body.appendChild( style )
}

function post( args ) {
	const inHeaders = args.headers || {}
	const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
	Object.assign( headers, inHeaders )

	const body = Object.keys( args.body ).map( k => `${ encodeURIComponent( k ) }=${ encodeURIComponent( args.body[ k ] ) }` ).join( '&' )
	return fetch( args.url, { method: 'POST', headers, body } ).then( r => r.json() )
}

function togglePlugin( target, op ) {
	const body = { action: 'greenlet_toggle_plugin', op, nonce: glOptionsData.nonce, plugin: target.dataset.plugin }
	const message = target.previousElementSibling
	post( { url: glOptionsData.ajaxUrl, method: 'POST', body } ).then( res => {
		if ( res.data.success ) {
			const newOp = ( 'activate' === op ) ? 'deactivate' : 'activate'
			target.dataset.op = newOp
			target.innerHTML = `<span class="spinner"></span> ${ newOp }`
			showTemporaryMessage( message, 3000, `${ op }d successfully` )
			location.reload()
		} else {
			showTemporaryMessage( message, 3000, `${ op } failed. Please try again` )
		}
	} ).catch( err => {
		showTemporaryMessage( message, 3000, `${ op } failed. Please try again` )
	} ).finally( () => target.classList.remove( 'running' ) )
}

function managePluginOp( e ) {
	if ( ! e.target.classList.contains( 'plugin-op' ) ) return
	e.preventDefault()

	const message = e.target.previousElementSibling

	e.target.classList.add( 'running' )
	if ( 'install-activate' === e.target.dataset.op ) {
		if ( wp.updates.shouldRequestFilesystemCredentials && ! wp.updates.ajaxLocked ) {
			wp.updates.requestFilesystemCredentials( e )
			jQuery(document).on( 'credential-modal-cancel', function() {
				showTemporaryMessage( message, 3000, wp.updates.l10n.installNow )
			} )
		}

		wp.updates.installPlugin( { slug: e.target.dataset.slug } ).then( res => {
			if ( 'activateUrl' in res ) {
				togglePlugin( e.target, 'activate' )
			} else {
				showTemporaryMessage( message, 3000, 'Installation failed. Please try again' )
				e.target.classList.remove( 'running' )
			}
		} ).catch( err => {
			showTemporaryMessage( message, 3000, 'Installation failed. Please try again' )
			e.target.classList.remove( 'running' )
		} )
	} else if ( 'activate' === e.target.dataset.op ) {
		togglePlugin( e.target, 'activate' )
	} else if ( 'deactivate' === e.target.dataset.op ) {
		togglePlugin( e.target, 'deactivate' )
	}
}

function initPluginOps() {
	const plugins = document.getElementsByClassName( 'greenlet-plugins' )
	if ( 0 === plugins.length ) return
	plugins[ 0 ].addEventListener( 'click', managePluginOp )
}

/**
 * Fill XHR HTML Section.
 */
function fillXhrSection() {
	const url = 'https://greenletwp.com/wp-json/greenlet/api-section'
	const xhrSection = document.getElementById( 'xhr-section' )

	fetch( url ).then( r => r.json() ).then( res => xhrSection.innerHTML = res.html ).catch( err => console.log( err ) )
}

function init() {
	addStyles()
	initPluginOps()
	fillXhrSection()
}

domReady( init )

export default { showTemporaryMessage, post }
