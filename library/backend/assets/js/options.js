/**
 * Custom scripts needed for options.
 *
 * @package greenlet\library\backend\assets\js
 */

/**
 * Show Temporary Message.
 *
 * @param {string} className Class Name.
 * @param {number} delay     Delay in microseconds.
 */
function showTemporaryMessage( className, delay = 5000 ) {
	var el = document.getElementsByClassName( className )[0]
	el.classList.add( 'show' );

	setTimeout(
		function() {
			el.classList.remove( 'show' );
		},
		delay
	)
}

/**
 * Convert JSON to Form data.
 *
 * @param {object} srcjson Source JSON object.
 * @returns {string}       Form Data.
 */
function jsonToFormData( srcjson ) {
	var urljson    = '';
	var keys       = Object.keys( srcjson );
	var keysLength = keys.length

	for ( var i = 0; i < keysLength; i++ ) {
		urljson += encodeURIComponent( keys[i] ) + '=' + encodeURIComponent( srcjson[keys[i]] );

		if ( i < (keys.length - 1) ) {
			urljson += '&';
		}
	}
	return urljson;
}

document.addEventListener(
	'click',
	function( e ) {
		if ( e.target && e.target.id === 'import-btn' ) {
			e.preventDefault();

			if ( ! window.confirm( 'Click OK to Import. Any saved theme settings will be lost!' ) ) {
				return;
			}

			var data = e.target.previousElementSibling.value;

			if ( data === '' ) {
				showTemporaryMessage( 'import-default' )
				return;
			}

			var nonce = e.target.nextElementSibling.value;
			var args  = { action: 'greenlet_options_import', value: data, nonce: nonce };

			var xhr = new XMLHttpRequest();
			xhr.open( 'POST', ajaxurl, true );
			xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			xhr.send( jsonToFormData( args ) );

			xhr.onload = function () {
				if ( xhr.readyState === 4 && xhr.status === 200 ) {
					if (xhr.responseText === '1') {
						showTemporaryMessage( 'import-success' )
					} else if (xhr.responseText === '2') {
						showTemporaryMessage( 'import-warning' )
					} else {
						showTemporaryMessage( 'import-error' )
					}
				}
			}
		}
	}
);

/**
 * XMLHttpRequest.
 *
 * @param {object} obj     Request Parameters.
 * @returns {Promise<any>} XHR Promise.
 */
function xhRequest( obj ) {
	return new Promise(
		function( resolve, reject ) {
			let xhr = new XMLHttpRequest();
			xhr.open( obj.method || 'GET', obj.url );

			if ( obj.headers ) {
				Object.keys( obj.headers ).forEach(
					function( key ) {
						xhr.setRequestHeader( key, obj.headers[ key ] );
					}
				);
			}

			xhr.onload = function() {
				if ( xhr.status >= 200 && xhr.status < 300 ) {
					resolve( xhr.response );
				} else {
					reject( xhr.statusText );
				}
			};

			xhr.onerror = function() {
				reject( xhr.statusText )
			};
			xhr.send( obj.body );
		}
	);
}

/**
 * Fill XHR HTML Section.
 */
function fill_xhr_section() {
	var url        = 'https://greenletwp.com/wp-json/greenlet/api-section';
	var xhrSection = document.getElementById( 'xhr-section' );

	var req = xhRequest( { url: url } )
	req.then(
		function( res ) {
			var data = JSON.parse( res )

			xhrSection.innerHTML = data.html;
		}
	);
	req.catch(
		function( err ) {
			console.log( err )
		}
	);
}

fill_xhr_section()
