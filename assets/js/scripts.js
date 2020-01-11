/**
 * Greenlet Theme JavaScript.
 *
 * @package greenlet\library\js
 */

var greenlet_loader = '<svg id="greenlet-loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><g id="loader-parts"><greenlet class="loader-ring" cx="25" cy="25" r="22" /><greenlet class="loader-c" cx="25" cy="25" r="22" /></g></svg>';

function greenlet_loader_listener(e) {
	e.preventDefault();
	var thisElement = e.target;
	add             = false;

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
	greenlet_page_loader( this, next_page, add )
}

function pagination_init() {
	var loadElements = document.querySelectorAll( '.pagination.load a' );
	var ajaxElements = document.querySelectorAll( '.pagination.ajax a' );
	if ( loadElements.length > 0 ) {
		loadElements[0].addEventListener( 'click', greenlet_loader_listener );
	}
	if ( ajaxElements.length > 0 ) {
		ajaxElements[0].addEventListener( 'click', greenlet_loader_listener );
	}
}

pagination_init();

window.onscroll = function (e) {
	var infinite = document.getElementsByClassName( 'pagination infinite' );
	if (infinite.length > 0) {

		var offset  = infinite[0].getBoundingClientRect();
		var loadpos = offset.top + 100; // 500
		var wheight = window.innerHeight;
		var sheight	= window.scrollY;
		if ( ( wheight + sheight ) > loadpos ) {
			var link  = infinite[0].querySelector( 'a' );
			next_page = link.getAttribute( 'data-next' );
			if ( link ) {
				link.style.display = 'none';
				greenlet_page_loader( link, next_page, true );
			}
		}
	}
}

function greenlet_page_loader( obj, cur_page, add, act ) {
	obj.parentNode.parentNode.innerHTML = '<span id="page-loader">' + greenlet_loader + '</span>';

	add  = typeof add !== 'undefined' ? add : false;
	act  = typeof act !== 'undefined' ? act : 'greenlet_get_paginated';
	args = {
		location: pagination_ajax.current_url,
		page: pagination_ajax.page,
		query_vars: pagination_ajax.query_vars,
		current: cur_page,
		append: add,
		action: act
	};

	if ( pagination_ajax.permalinks ) {
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

	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', pagination_ajax.ajaxurl, true );
	xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
	xhr.send( jsonToFormData( args ) );

	xhr.onload = function () {
		var res = JSON.parse( xhr.responseText );
		if ( xhr.readyState === 4 && xhr.status === 200 ) {
			if ( add ) {
				var wrap       = document.querySelector( '.main .wrap' )
				wrap.innerHTML = wrap.innerHTML + res.posts;
			} else {
				document.querySelector( '.main .wrap' ).innerHTML = res.posts
			}
			var pageLoader = document.getElementById( 'page-loader' );
			pageLoader.parentElement.removeChild( pageLoader );
			pagination_init();
		}
	}
}

function jsonToFormData( srcjson ) {
	if ( (typeof srcjson !== 'object') && (typeof console !== 'undefined') ) {
		console.log( '"srcjson" is not a JSON object' );
		return null;
	}
	u = encodeURIComponent;

	var urljson = '';
	var keys    = Object.keys( srcjson );

	var keysLength = keys.length
	for ( var i = 0; i < keysLength; i++ ) {
		urljson += u( keys[i] ) + '=' + u( srcjson[keys[i]] );

		if ( i < (keys.length - 1) ) {
			urljson += '&';
		}
	}
	return urljson;
}

function dexwwwfurlenc(urljson){
	var dstjson = {};
	var ret;
	var reg = /(?:^|&)(\w+)=(\w+)/g;
	while ( ( ret = reg.exec( urljson ) ) !== null ) {
		dstjson[ret[1]] = ret[2];
	}
	return dstjson;
}
