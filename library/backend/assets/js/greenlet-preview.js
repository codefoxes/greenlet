/**
 * Greenlet Customizer Preview.
 *
 * @package greenlet\library\backend\assets\js
 */

(function( $ ) {
	if ( ! wp || ! wp.customize ) {
		return;
	}

	function bindStyle( controlId, selector, style, suffix ) {
		wp.customize(
			controlId,
			function ( value ) {
				var headTag  = document.head
				var styleTag = document.createElement( 'style' )
				styleTag.id  = controlId + '-css'
				headTag.appendChild( styleTag )

				value.bind(
					function ( to ) {
						if ( suffix ) {
							to = to + suffix
						}
						styleTag.innerHTML = selector + '{' + style + ': ' + to + ';}'
					}
				)
			}
		)
	}

	var inputSelector  = 'input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea, select'
	var buttonSelector = '.button, button, input[type="submit"], input[type="reset"], input[type="button"], .pagination li a, .pagination li span'

	function getPseudo ( selectors, pseudo ) {
		if ( ! Array.isArray( selectors ) ) {
			selectors = selectors.split( ',' )
		}
		if ( typeof pseudo === 'undefined' ) {
			pseudo = ':hover'
		}

		var pseudoSelectors = []
		var selectorsLength = selectors.length
		for ( var i = 0; i < selectorsLength; i++ ) {
			pseudoSelectors.push( selectors[ i ] + pseudo )
		}
		return pseudoSelectors.join( ',' )
	}

	bindStyle( 'logo_width', '.site-logo img', 'width', 'px' )
	bindStyle( 'logo_height', '.site-logo img', 'height', 'px' )
	bindStyle( 'site_bg', 'body', 'background' )
	bindStyle( 'site_color', 'body', 'color' )
	bindStyle( 'topbar_bg', '.topbar', 'background' )
	bindStyle( 'topbar_color', '.topbar', 'color' )
	bindStyle( 'header_bg', '.site-header', 'background' )
	bindStyle( 'header_color', '.site-header, .site-header a', 'color' )
	bindStyle( 'header_link_hover', '.site-header a:hover', 'color' )
	bindStyle( 'main_bg', '.site-content', 'background' )
	bindStyle( 'content_bg', '.entry-article, .sidebar > .wrap, #comments', 'background' )
	bindStyle( 'semifooter_bg', '.semifooter', 'background' )
	bindStyle( 'semifooter_color', '.semifooter', 'color' )
	bindStyle( 'footer_bg', '.site-footer', 'background' )
	bindStyle( 'footer_color', '.site-footer', 'color' )
	bindStyle( 'heading_color', 'h1, h2, h3, h4, h5, h6, .entry-title a', 'color' )
	bindStyle( 'link_color', 'a, .entry-meta li', 'color' )
	bindStyle( 'link_hover', 'a:hover', 'color' )
	bindStyle( 'button_bg', buttonSelector, 'background' )
	bindStyle( 'button_color', buttonSelector, 'color' )
	bindStyle( 'button_border', buttonSelector, 'border' )
	bindStyle( 'button_hover_bg', getPseudo( buttonSelector ), 'background' )
	bindStyle( 'button_hover_color', getPseudo( buttonSelector ), 'color' )
	bindStyle( 'button_hover_border', getPseudo( buttonSelector ), 'border' )
	bindStyle( 'input_bg', inputSelector, 'background' )
	bindStyle( 'input_color', inputSelector, 'color' )
	bindStyle( 'input_border', inputSelector, 'border' )
	bindStyle( 'input_placeholder', getPseudo( inputSelector, '::placeholder' ), 'color' )
	bindStyle( 'input_focus_bg', getPseudo( inputSelector, ':focus' ), 'background' )
	bindStyle( 'input_focus_color', getPseudo( inputSelector, ':focus' ), 'color' )
	bindStyle( 'input_focus_border', getPseudo( inputSelector, ':focus' ), 'border' )
	bindStyle( 'input_focus_placeholder', getPseudo( getPseudo( inputSelector, ':focus' ), '::placeholder' ), 'color' )
})( jQuery );
