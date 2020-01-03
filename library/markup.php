<?php
/**
 * markup.php
 *
 * Get markup.
 *
 * @package Greenlet
 * @subpackage /library
 */

function greenlet_markup( $context, $attributes = '' ) {

	global $is_html5, $open_tags;

	if ( $is_html5 )
		$tag = greenlet_markup_tag( $context );
	else $tag = greenlet_markup_legacy_tag( $context );

	$final_tag = apply_filters( "greenlet_markup_tag_{$context}", $tag );
	echo '<' . $final_tag . ' ' . $attributes . '>';
	$open_tags[] = $final_tag;
}

function greenlet_markup_close( $close = 1 ) {

	global $open_tags;

	for ( $i = 1; $i <= $close; $i++) {
		echo '</' . array_pop( $open_tags ) . '>';
	}
}

function greenlet_markup_tag( $context ) {
	switch ( $context ) {
		case 'site-content':
		case 'entry-content':
		case 'comments-area':
		case 'semifooter':
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

function greenlet_markup_legacy_tag( $context ) {
	if (  $context === 'entry-meta' )
		return 'ul';
	else return 'div';
}
