<?php
/**
 * Greenlet Markup Manager.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Print markup tag.
 *
 * @since 1.0.0
 * @param string $context    Context/Place to add markup.
 * @param string $attributes Tag attributes.
 */
function greenlet_markup( $context, $attributes = '' ) {

	global $open_tags;

	$tag = greenlet_markup_tag( $context );

	$final_tag = apply_filters( "greenlet_markup_tag_{$context}", $tag );
	echo '<' . esc_html( $final_tag ) . ' ' . wp_kses( $attributes, null ) . '>';
	$open_tags[] = $final_tag;
}

/**
 * Close opened tags opened via greenlet_markup.
 *
 * @since 1.0.0
 * @param int $close Number of tags to close.
 */
function greenlet_markup_close( $close = 1 ) {

	global $open_tags;

	for ( $i = 1; $i <= $close; $i++ ) {
		echo '</' . esc_html( array_pop( $open_tags ) ) . '>';
	}
}

/**
 * Retrieve Markup tag.
 *
 * @since  1.0.0
 * @param  string $context Context/Place of the tag.
 * @return string          Tag name.
 */
function greenlet_markup_tag( $context ) {
	switch ( $context ) {
		case 'site-content':
		case 'entry-content':
		case 'comments-area':
		case 'sub-header':
		case 'sub-footer':
			$tag = 'section';
			break;
		case 'main':
			$tag = 'main';
			break;
		case 'navigation':
		case 'site-navigation':
		case 'secondary-navigation':
		case 'footer-navigation':
			$tag = 'nav';
			break;
		case 'site-header':
		case 'page-header':
		case 'entry-header':
			$tag = 'header';
			break;
		case 'entry-thumbnail':
		case 'featured-image':
			$tag = 'figure';
			break;
		case 'entry':
			$tag = 'article';
			break;
		case 'entry-meta':
			$tag = 'ul';
			break;
		case 'site-footer':
		case 'entry-footer':
			$tag = 'footer';
			break;
		case 'sidebar':
			$tag = 'aside';
			break;
		case 'wrap':
		case 'main-wrap':
		case 'side-wrap':
		default:
			$tag = 'div';
	}
	return $tag;
}
