/**
 * Greenlet Theme JavaScript.
 *
 * @package greenlet\library\js
 */

const loader = '<svg id="greenlet-loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><g id="loader-parts"><circle class="loader-ring" cx="25" cy="25" r="22" /><circle class="loader-c" cx="25" cy="25" r="22" /></g></svg>';

/**
 * Page loader Listener.
 *
 * @param {Event} e Click event.
 */
function listenLoader(e) {
	e.preventDefault();
	var thisElement = e.target;
	var add         = false;
	var next_page   = 2;

	if ( thisElement.classList.contains( 'next' ) ) {
		next_page = parseInt( document.querySelector( '.pagination span.current' ).textContent ) + 1
	} else if ( thisElement.classList.contains( 'prev' ) ) {
		next_page = parseInt( document.querySelector( '.pagination span.current' ).textContent ) - 1
	} else if ( thisElement.classList.contains( 'load' ) ) {
		next_page = thisElement.getAttribute( 'data-next' );
		add       = true;
	} else {
		next_page = thisElement.textContent;
	}
	loadPage( this, next_page, add )
}

/**
 * Initialize Pagination Listeners.
 */
function initPagination() {
	var loadElements = document.querySelectorAll( '.pagination.load a' );
	var ajaxElements = document.querySelectorAll( '.pagination.ajax a' );
	if ( loadElements.length > 0 ) {
		loadElements[0].addEventListener( 'click', listenLoader );
	}
	var ajaxElementsLength = ajaxElements.length;
	for (var i = 0; i < ajaxElementsLength; i++) {
		ajaxElements[i].addEventListener( 'click', listenLoader );
	}
	if ( null === this.tmpEl ) {
		this.tmpEl = document.createElement( 'div' )
		this.tmpEl.id = 'greenlet-temp'
	}
}

/**
 * Load Paginated content.
 *
 * @param {Node}   obj      Pagination link Node.
 * @param {number} cur_page Current Page Number.
 * @param {bool}   add      Append or Replace.
 * @param {string} act      WordPress action.
 */
function loadPage( obj, cur_page, add, act ) {
	var nonce = document.getElementById( 'greenlet_generic_nonce' ).value;

	obj.parentNode.parentNode.innerHTML = '<span id="page-loader">' + Greenlet.loader + '</span>';

	add  = typeof add !== 'undefined' ? add : false;
	act  = typeof act !== 'undefined' ? act : 'greenlet_get_paginated';
	const args = {
		location: greenletData.current_url,
		page: greenletData.page,
		query_vars: greenletData.query_vars,
		current: cur_page,
		append: add,
		action: act,
		nonce: nonce
	};

	if ( greenletData.permalinks ) {
		if ( ! parseInt( cur_page ) ) {
			cur_page = location.href.replace( /.+\/page\/([0-9]+).+/, "$1" )
		}
		args.location = args.location.replace( /\/?/, "" ) + "/page/" + cur_page + "/"
	} else {
		if ( ! parseInt( cur_page ) ) {
			cur_page = location.href.replace( /.+paged?=([0-9]+).+/, "$1" )
		}
		args.location = args.location.replace( /\/?/, "" ) + "?page=" + cur_page + ""
	}

	const xhr = new XMLHttpRequest()
	xhr.open( 'POST', greenletData.ajaxurl, true );
	xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
	xhr.send( jsonToFormData( args ) );

	xhr.onload = function () {
		const res = JSON.parse( xhr.responseText );
		if ( xhr.readyState === 4 && xhr.status === 200 ) {
			if ( add ) {
				const wrap = document.querySelector( '.main .wrap' )
				wrap.innerHTML = wrap.innerHTML + res.posts;
			} else {
				document.querySelector( '.main .wrap' ).innerHTML = res.posts
			}
			const pageLoader = document.getElementById( 'page-loader' )
			if ( pageLoader !== null ) {
				pageLoader.parentElement.removeChild( pageLoader )
			}
			Greenlet._listeners.forEach( fn => fn() )
			Greenlet.initPagination();
		}
	}
}

/**
 * Infinite scroll.
 */
function infiniteScroll() {
	var infinite = document.getElementsByClassName( 'pagination infinite' );
	if (infinite.length > 0) {

		var offset  = infinite[ infinite.length - 1 ].getBoundingClientRect();
		var loadpos = offset.top + 100; // 500
		var wheight = window.innerHeight;
		var sheight	= window.scrollY;
		if ( ( wheight + sheight ) > loadpos ) {
			var link = infinite[ infinite.length - 1 ].querySelector( 'a' );
			if ( link !== null ) {
				var next_page      = link.getAttribute( 'data-next' );
				link.style.display = 'none';
				loadPage( link, next_page, true );
			}
		}
	}
}

/**
 * Toggle Infinite scroll.
 *
 * @param {string} op Enable or Disable.
 */
function toggleScroll( op ) {
	if ( ( 'undefined' === typeof op ) || ( false !== op ) ) {
		window.addEventListener( 'scroll', infiniteScroll )
	} else {
		window.removeEventListener( 'scroll', infiniteScroll )
	}
}

/**
 * Fix tag.
 */
function fixTag() {
	var current = document.querySelector('meta[name="description"]');
	if ( null === current ) {
		var tag = document.createElement('meta');
		tag.name = "description";
		tag.content = greenletData.page_data;
		document.getElementsByTagName('head')[0].appendChild(tag);
	}
}

/**
 * Convert JSON to Form data.
 *
 * @param {object} body Source JSON object.
 * @returns {string}    Form Data.
 */
function jsonToFormData ( body ) {
	return Object.keys( body ).map( ( key ) => {
		return Array.isArray( body[ key ] ) ? body[ key ].map( value => key + '=' + encodeURIComponent( value ) ).join( '&' ) : key + '=' + encodeURIComponent( body[ key ] )
	} ).join( '&' )
}

/**
 * Fix Toggle Menu position.
 */
function fixMenu() {
	let prevToggle = null
	document.body.addEventListener( 'keyup', function ( e ) {
		if ( e.key === 'Tab' || e.keyCode === '9' ) {
			var parent = document.activeElement.parentNode
			if ( ! parent.classList.contains( 'menu-item' ) ) {
				var focused = document.querySelector( '.menu-item.focus' )
				;( focused !== null ) && focused.classList.remove( 'focus' )
				;( prevToggle !== null ) && ( prevToggle.checked = false )
			}
			;( parent.previousElementSibling !== null ) && parent.previousElementSibling.classList.remove( 'focus' )
			;( parent.nextElementSibling !== null ) && parent.nextElementSibling.classList.remove( 'focus' )
			;( parent.classList.contains( 'menu-item-has-children' ) ) && parent.classList.add( 'focus' )
			;( document.activeElement.classList.contains( 'menu-toggle' ) ) && ( document.activeElement.checked = true ) && ( prevToggle = document.activeElement )
		}
	});

	var fixToggle = function() {
		var togglers = document.getElementsByClassName( 'menu-toggle-button' )
		for ( var i = 0; i < togglers.length; i++ ) {
			var container = togglers[ i ].closest( '.header-section' )
			if ( null === container ) {
				container = togglers[ i ].closest( '.footer-section' )
			}
			togglers[ i ].style.top = '-' + ( ( container.offsetHeight / 2 ) + 12 ) + 'px'
		}
	}

	window.addEventListener('load', fixToggle );
	window.addEventListener('resize', fixToggle );
}

/**
 * Enable additional menu togglers.
 */
function toggleMenu() {
	var togglers = document.getElementsByClassName( 'menu-toggler' )

	var toggleMenu = function( target ) {
		target.classList.toggle( 'visible' )
	}

	for ( var i = 0; i < togglers.length; i++ ) {
		var dataSet = togglers[ i ].dataset
		var target = ( 'query' === dataSet.target && 'query' in dataSet ) ? document.querySelector( dataSet.query ) : document.querySelector( '.' + dataSet.target )
		if ( null === target ) {
			target = togglers[ i ].parentElement.querySelector( '.menu-list')
		}
		target.classList.add( ( 'effect' in dataSet ) ? dataSet.effect: 'left' )
		togglers[ i ].addEventListener( 'click', toggleMenu.bind( this, target ) )
	}
}

function toTop() {
	var btn = document.getElementsByClassName( 'to-top' )
	if ( 0 === btn.length ) return
	var showTop = function() {
		var at = greenletData.to_top_at;
		if ( -1 !== at.indexOf( 'px' ) ) {
			at = parseInt( at.split( 'px' )[ 0 ], 10 )
		} else if ( -1 !== at.indexOf( '%' ) ) {
			at = ( parseInt( at.split( '%' )[ 0 ], 10 ) * ( document.body.offsetHeight - window.innerHeight ) / 100 )
		}
		if ( window.scrollY >= at ) {
			btn[ 0 ].classList.add( 'show' )
		} else {
			btn[ 0 ].classList.remove( 'show' )
		}
	}
	window.addEventListener( 'scroll', showTop )
	window.addEventListener( 'load', showTop )
}

function subscribe( fn ) {
	this._listeners.push( fn )
}

const Greenlet = { _listeners: [], tmpEl: null, subscribe, toTop, initPagination, toggleScroll, fixTag, fixMenu, toggleMenu, jsonToFormData, loader }
Greenlet.init = function() {
	this.toTop()
	this.initPagination()
	this.toggleScroll()
	this.fixTag()
	this.fixMenu()
	this.toggleMenu()
}
Greenlet.init()

export default Greenlet
