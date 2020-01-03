<?php
/**
 * attributes.php
 *
 * Get attributes.
 *
 * @package Greenlet
 * @subpackage /library
 */


/**
 * Sets attributes and values.
 *
 * Returns attributes, adds wildcard filter hook.
 *
 * @since 1.0.0
 * @see wp-includes/functions.php.
 *
 * @param mixed $args Primary class string or with width array.
 * @param boolean $get_array True to return attributes array.
 * @return string attributes in name="value" format.
 *
 */
function greenlet_attr( $args, $get_array = false ) {

	// Set width to null.
	$width = null;

	// If arguments is array,
	if ( is_array( $args ) ) {

		// Default arguments array.
		$defaults = array(
			'primary' => '',
			'width' => ''
			);

		// Parse arguments and merge with defaults array.
		$args = wp_parse_args( $args, $defaults );

		// Get width from merged array.
		$width = $args[ 'width' ];

		// Get classes from merged array.
		$args = $args[ 'primary' ];
	}

	// Separate multiple classes if provided.
	$class_array = explode( ' ', $args );

	// First element is primary class.
	$primary = $class_array[ 0 ];

	// Default attributes array.
	$attributes = array(
		'class' => $args
		);

	$media = apply_filters( "greenlet_media_{$primary}", array() );
	$media_defaults = array(
		'xs' => null,
		'sm' => null,
		'lg' => null,
		'small' => null,
		'large' => null
		);
	$mq = wp_parse_args( $media, $media_defaults );

	// If width is set,
	if ( $width ) {
		// Get css framework from options.
		$css_framework = of_get_option( 'css_framework' ) ? of_get_option( 'css_framework' ) : 'default';

		switch ( $css_framework ) {
			case 'default':
				$attributes[ 'class' ] .= ' col-' . $width;
				break;
			case 'foundation':
				$attributes[ 'class' ] .= ' medium-' . $width . ' columns';
				break;
			case 'bootstrap':
				$attributes[ 'class' ] .= ' col-md-' . $width;
				if ( $mq['sm'] ) $attributes['class'] .= ' col-sm-' . $mq['sm'];
				if ( $mq['xs'] ) $attributes['class'] .= ' col-xs-' . $mq['xs'];
				break;
			case 'gumby':
				$attributes[ 'class' ] .= ' ' . greenlet_read_number( $width ) . ' columns';
				break;
		}

	}

	// If schema enabled, add filter to each primary class.
	if ( of_get_option( 'schema' ) ) {
		add_filter( "greenlet_attr_{$primary}", "greenlet_attribute", 10, 2 );
	}

	/**
	 * Wildcard filter hook.
	 *
	 * Change or Add attributes to greenlet_attr() with primary class.
	 * @var string $primary    HTML class.
	 * @var array  $attributes HTML attributes.
	 */
	$attributes = apply_filters( "greenlet_attr_{$primary}", $attributes, $primary );

	if ( $get_array === true ) return $attributes;

	// Set empty var $output.
	$output = '';

	// For each default attr or modified attr by filter,
	foreach ( $attributes as $key => $value ) {

		// Add attribute as name="value".
		$output .= sprintf( '%s="%s" ', esc_html( $key ), esc_attr( $value ) );
	}

	return $output;
}


/**
 * Get attributes array.
 *
 * Returns extra attributes array for schema, rel, role etc.
 *
 * @since 1.0.0
 *
 * @param string $primary HTML class.
 * @return array of extra attributes.
 *
 */
function greenlet_attribute( $attributes, $primary ) {

	// If $primary variable,
	switch ( $primary ) {

		// Is body, add web page schema.
		case 'body':
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/WebPage';
			break;

		// Is site-header, add banner role, header schema.
		case 'site-header':
			$attributes[ 'id' ]			= 'header';
			$attributes[ 'role' ]		= 'banner';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/WPHeader';
			break;

		// Is site-content, add id
		case 'site-content':
			$attributes[ 'id' ]			= 'content';
			break;

		// Is site-logo, add organization schema.
		case 'site-logo':
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/Organization';
			break;

		// Is site-name or author-name, add name prop.
		case 'site-name':
		case 'author-name':
			$attributes[ 'itemprop' ]	= 'name';
			break;

		// Is site-url, add rel home, url prop.
		case 'site-url':
			$attributes[ 'itemprop' ]	= 'url';
			$attributes[ 'rel' ]		= 'home';
			break;

		// Is site-navigation, add nav role, nav schema.
		case 'site-navigation':
			$attributes[ 'role' ]		= 'navigation';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ] 	= 'http://schema.org/SiteNavigationElement';
			break;

		// Is main, add main role, prop.
		case 'main':
			$attributes[ 'role' ]		= 'main';
			$attributes[ 'itemprop' ]	= 'mainEntityOfPage';

			// If page has blog,
			if ( is_singular( 'post' ) || is_archive() || is_home() || is_page_template( 'page_blog.php' ) ) {

				// Add Blog schema.
				$attributes[ 'itemscope' ]	= 'itemscope';
				$attributes[ 'itemtype' ]	= 'http://schema.org/Blog';
			}

			// If search page,
			if ( is_search() ) {

				// Add searchpage schema.
				$attributes[ 'itemscope' ]	= 'itemscope';
				$attributes[ 'itemtype' ]	= 'http://schema.org/SearchResultsPage';
			}
			break;

		// Is sidebar, add complementory role, sidebar schema.
		case 'sidebar':
			$attributes[ 'role' ]		= 'complementary';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/WPSideBar';
			break;

		// Is entry, add post classes, creativework schema.
		case 'entry':
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/CreativeWork';

			// If is post,
			if ( 'post' === get_post_type() ) {

				// Add blogposting schema.
				$attributes['itemtype']	= 'http://schema.org/BlogPosting';

				// If is main query (not secondary), add blogpost prop.
				if ( is_main_query() ) {
					$attributes['itemprop']	= 'blogPost';
				}
			}
			break;

		// Is entry-thumbnail or image, add image prop.
		case 'entry-thumbnail':
		case 'image':
			$attributes[ 'itemprop' ]	= 'image';
			break;

		// Is entry-title, add headline prop.
		case 'entry-title':
			$attributes[ 'itemprop' ]	= 'headline';
			break;

		// Is entry-content, add text prop.
		case 'entry-content':
			$attributes[ 'itemprop' ]	= 'text';
			break;

		case 'meta-author':
			$attributes[ 'itemprop' ]	= 'author';
			break;

		// Is author, add person schema, author prop.
		case 'author':
			$attributes[ 'itemprop' ]	= 'author';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/Person';
			break;

		// Is author-link, add url prop, author rel.
		case 'author-link':
			$attributes[ 'itemprop' ]	= 'url';
			$attributes[ 'rel' ]		= 'author';
			break;

		// Is site-header, add banner role, header schema.
		case 'comments-area':
			$attributes[ 'id' ]			= 'comments';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/UserComments';
			break;

		// Is meta-date, add date published prop, datetime.
		case 'meta-date':
			$attributes[ 'itemprop' ]	= 'datePublished';
			$attributes[ 'datetime' ]	= get_the_time( 'c' );
			break;

		// Is meta-date-modified, add date modified prop, datetime.
		case 'meta-date-modified':
			$attributes[ 'itemprop' ]	= 'dateModified';
			$attributes[ 'datetime' ]	= get_the_modified_time( 'c' );
			break;

		// Is site-footer, add contentinfo role, footer schema.
		case 'site-footer':
			$attributes[ 'id' ]			= 'footer';
			$attributes[ 'role' ]		= 'contentinfo';
			$attributes[ 'itemscope' ]	= 'itemscope';
			$attributes[ 'itemtype' ]	= 'http://schema.org/WPFooter';
			break;
	}

	return $attributes;
}


/**
 * Converts number to words.
 * @param  integer	$num	Number to be converted
 * @return string			Number in words.
 */
function greenlet_read_number( $num ) {
	$num = (int)$num;
	$word ="";

	// from 0 to 99
	$mod = floor($num / 10);
	if ($mod == 0) { // ones place
		if ($num == 1) $word.="one";
		else if ($num == 2) $word.="two";
		else if ($num == 3) $word.="three";
		else if ($num == 4) $word.="four";
		else if ($num == 5) $word.="five";
		else if ($num == 6) $word.="six";
		else if ($num == 7) $word.="seven";
		else if ($num == 8) $word.="eight";
		else if ($num == 9) $word.="nine";
	}
	else if ($mod == 1) { // if there's a one in the ten's place
		if ($num == 10) $word.="ten";
		else if ($num == 11) $word.="eleven";
		else if ($num == 12) $word.="twelve";
		else if ($num == 13) $word.="thirteen";
		else if ($num == 14) $word.="fourteen";
		else if ($num == 15) $word.="fifteen";
		else if ($num == 16) $word.="sixteen";
		else if ($num == 17) $word.="seventeen";
		else if ($num == 18) $word.="eighteen";
		else if ($num == 19) $word.="nineteen";
	}
	return $word;
}
