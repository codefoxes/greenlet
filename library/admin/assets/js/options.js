/**
 * Custom scripts needed for options.
 */

function showTemporaryMessage( className, delay = 5000 ) {
	var el = document.getElementsByClassName( className )[0]
	el.classList.add( 'show' );

	setTimeout( function() {
		el.classList.remove( 'show' );
	}, delay )
}

function jsonToFormData( srcjson ) {
	var urljson = '';
	var keys = Object.keys( srcjson );
	var keysLength = keys.length

	for ( var i = 0; i < keysLength; i++ ) {
		urljson += encodeURIComponent( keys[i] ) + '=' + encodeURIComponent( srcjson[keys[i]] );

		if ( i < (keys.length - 1) ) {
			urljson += '&';
		}
	}
	return urljson;
}

document.addEventListener( 'click',function( e ) {
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
		var args = { action: 'greenlet_options_import', value: data, nonce: nonce };

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
});
