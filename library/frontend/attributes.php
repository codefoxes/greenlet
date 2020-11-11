<?php
/**
 * Attributes Manager.
 *
 * Get attributes.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sets attributes and values.
 *
 * Returns attributes, adds wildcard filter hook.
 *
 * @since 1.0.0
 * @see wp-includes/functions.php.
 *
 * @param  mixed   $args Primary class string or with width array.
 * @param  boolean $get_array True to return attributes array.
 * @return string  attributes in name="value" format.
 */
function greenlet_attr( $args, $get_array = false ) {

	// Set width to null.
	$width = null;

	$class_names = $args;

	$attributes = array();

	// If arguments is array.
	if ( is_array( $args ) ) {

		// Default arguments array.
		$defaults = array(
			'primary' => '',
			'width'   => '',
		);

		// Parse arguments and merge with defaults array.
		$args = wp_parse_args( $args, $defaults );

		// Get width from merged array.
		$width = $args['width'];

		// Get classes from merged array.
		$class_names = $args['primary'];

		unset( $args['primary'] );
		unset( $args['width'] );

		$attributes = $args;
	}

	// Separate multiple classes if provided.
	$class_array = explode( ' ', $class_names );

	// First element is primary class.
	$primary = $class_array[0];

	// Default attributes array.
	$attributes = array_merge( array( 'class' => $class_names ), $attributes );

	$media = apply_filters( "greenlet_media_{$primary}", array() );

	$media_defaults = array(
		'xs'    => null,
		'sm'    => null,
		'lg'    => null,
		'small' => null,
		'large' => null,
	);

	$mq = wp_parse_args( $media, $media_defaults );

	// Get css framework from options.
	$css_framework = gl_get_option( 'css_framework', 'default' );

	// If width is set.
	if ( $width ) {
		switch ( $css_framework ) {
			case 'default':
				$attributes['class'] .= ' col-' . $width;
				break;
			case 'bootstrap':
				$attributes['class'] .= ' col-md-' . $width;
				if ( $mq['sm'] ) {
					$attributes['class'] .= ' col-sm-' . $mq['sm'];
				}
				if ( $mq['xs'] ) {
					$attributes['class'] .= ' col-xs-' . $mq['xs'];
				}
				break;
		}
		$attributes = apply_filters( 'greenlet_attr_col', $attributes, $primary, $css_framework, $width, $mq );
	}

	// If schema enabled, add filter to each primary class.
	if ( gl_get_option( 'schema', '1' ) ) {
		add_filter( "greenlet_attr_{$primary}", 'greenlet_attribute', 10, 2 );
	}

	/**
	 * Wildcard filter hook.
	 *
	 * Change or Add attributes to greenlet_attr() with primary class.
	 *
	 * @var string $primary    HTML class.
	 * @var array  $attributes HTML attributes.
	 */
	$attributes = apply_filters( "greenlet_attr_{$primary}", $attributes, $primary, $css_framework );

	if ( true === $get_array ) {
		return $attributes;
	}

	// Set empty var $output.
	$output = '';

	// For each default attr or modified attr by filter.
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
 * @param  array  $attributes HTML attributes.
 * @param  string $primary HTML class.
 * @return array of extra attributes.
 */
function greenlet_attribute( $attributes, $primary ) {

	// If $primary variable.
	switch ( $primary ) {

		// Is body, add web page schema.
		case 'body':
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/WebPage';
			break;

		// Is site-header, add banner role, header schema.
		case 'site-header':
			$attributes['id']        = 'header';
			$attributes['role']      = 'banner';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/WPHeader';
			break;

		// Is site-content, add id.
		case 'site-content':
			$attributes['id'] = 'content';
			break;

		// Is site-logo, add organization schema.
		case 'site-logo':
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/Organization';
			break;

		// Is site-name or author-name, add name prop.
		case 'site-name':
		case 'author-name':
			$attributes['itemprop'] = 'name';
			break;

		// Is site-url, add rel home, url prop.
		case 'site-url':
			$attributes['itemprop'] = 'url';
			$attributes['rel']      = 'home';
			break;

		// Is site-navigation, add nav role, nav schema.
		case 'site-navigation':
			$attributes['role']      = 'navigation';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/SiteNavigationElement';
			break;

		// Is main, add main role, prop.
		case 'main':
			$attributes['role']     = 'main';
			$attributes['itemprop'] = 'mainEntityOfPage';

			// If page has blog.
			if ( is_singular( 'post' ) || is_archive() || is_home() || is_page_template( 'page_blog.php' ) ) {

				// Add Blog schema.
				$attributes['itemscope'] = 'itemscope';
				$attributes['itemtype']  = 'https://schema.org/Blog';
			}

			// If search page.
			if ( is_search() ) {

				// Add searchpage schema.
				$attributes['itemscope'] = 'itemscope';
				$attributes['itemtype']  = 'https://schema.org/SearchResultsPage';
			}
			break;

		// Is sidebar, add complementory role, sidebar schema.
		case 'sidebar':
			$attributes['role']      = 'complementary';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/WPSideBar';
			break;

		// Is entry, add post classes, creativework schema.
		case 'entry':
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/CreativeWork';

			// If is post.
			if ( 'post' === get_post_type() ) {

				// Add blogposting schema.
				$attributes['itemtype'] = 'https://schema.org/BlogPosting';

				// If is main query (not secondary), add blogpost prop.
				if ( is_main_query() ) {
					$attributes['itemprop'] = 'blogPost';
				}
			}
			break;

		// Is entry-thumbnail or image, add image prop.
		case 'entry-thumbnail':
		case 'featured-image':
		case 'image':
			$attributes['itemprop'] = 'image';
			break;

		// Is entry-title, add headline prop.
		case 'entry-title':
			$attributes['itemprop'] = 'headline';
			break;

		// Is entry-content, add text prop.
		case 'entry-content':
			$attributes['itemprop'] = 'text';
			break;

		case 'meta-author':
			$attributes['itemprop'] = 'author';
			break;

		// Is author, add person schema, author prop.
		case 'author':
			$attributes['itemprop']  = 'author';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/Person';
			break;

		// Is author-link, add url prop, author rel.
		case 'author-link':
			$attributes['itemprop'] = 'url';
			$attributes['rel']      = 'author';
			break;

		// Is site-header, add banner role, header schema.
		case 'comments-area':
			$attributes['id']        = 'comments';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/UserComments';
			break;

		// Is meta-date, add date published prop, datetime.
		case 'meta-date':
			$attributes['itemprop'] = 'datePublished';
			$attributes['datetime'] = get_the_time( 'c' );
			break;

		// Is meta-date-modified, add date modified prop, datetime.
		case 'meta-date-modified':
			$attributes['itemprop'] = 'dateModified';
			$attributes['datetime'] = get_the_modified_time( 'c' );
			break;

		// Is site-footer, add contentinfo role, footer schema.
		case 'site-footer':
			$attributes['id']        = 'footer';
			$attributes['role']      = 'contentinfo';
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/WPFooter';
			break;

		case 'breadcrumb':
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemtype']  = 'https://schema.org/BreadcrumbList';
			break;

		case 'breadcrumb-item':
			$attributes['itemscope'] = 'itemscope';
			$attributes['itemprop']  = 'itemListElement';
			$attributes['itemtype']  = 'https://schema.org/ListItem';
			break;
	}

	return $attributes;
}


/**
 * Converts number to words.
 *
 * @since  1.0.0
 * @param  integer $num Number to be converted.
 * @return string       Number in words.
 */
function greenlet_read_number( $num ) {
	$num  = (int) $num;
	$word = '';

	// from 0 to 99.
	$mod = floor( $num / 10 );
	if ( 0 === $mod ) { // ones place.
		if ( 1 === $num ) {
			$word .= 'one';
		} elseif ( 2 === $num ) {
			$word .= 'two';
		} elseif ( 3 === $num ) {
			$word .= 'three';
		} elseif ( 4 === $num ) {
			$word .= 'four';
		} elseif ( 5 === $num ) {
			$word .= 'five';
		} elseif ( 6 === $num ) {
			$word .= 'six';
		} elseif ( 7 === $num ) {
			$word .= 'seven';
		} elseif ( 8 === $num ) {
			$word .= 'eight';
		} elseif ( 9 === $num ) {
			$word .= 'nine';
		}
	} elseif ( 1 === $mod ) { // if there's a one in the ten's place.
		if ( 10 === $num ) {
			$word .= 'ten';
		} elseif ( 11 === $num ) {
			$word .= 'eleven';
		} elseif ( 12 === $num ) {
			$word .= 'twelve';
		} elseif ( 13 === $num ) {
			$word .= 'thirteen';
		} elseif ( 14 === $num ) {
			$word .= 'fourteen';
		} elseif ( 15 === $num ) {
			$word .= 'fifteen';
		} elseif ( 16 === $num ) {
			$word .= 'sixteen';
		} elseif ( 17 === $num ) {
			$word .= 'seventeen';
		} elseif ( 18 === $num ) {
			$word .= 'eighteen';
		} elseif ( 19 === $num ) {
			$word .= 'nineteen';
		}
	}
	return $word;
}
