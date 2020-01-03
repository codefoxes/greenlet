<?php
/**
 * footer-structure.php
 *
 * Footer structure functions.
 *
 * @package Greenlet
 * @subpackage /library
 */

add_action( 'greenlet_semifooter', 'greenlet_do_semifooter' );
add_action( 'greenlet_footer', 'greenlet_do_footer' );

/**
 * Display the semifooter.
 *
 * @see greenlet_cover() to display semifooter columns.
 * @return html semifooter section
 */
function greenlet_do_semifooter() {

	$sfshow = of_get_option( 'show_semifooter' ) ? of_get_option( 'show_semifooter' ) : 0;

	if ( $sfshow == 1 ) {
		greenlet_markup( 'semifooter',	greenlet_attr( 'semifooter' ) );
		printf( '<div %s>', greenlet_attr( 'container' ) );
		printf( '<div %s>', greenlet_attr( 'row' ) );
		greenlet_cover( 'semifooter' );
		echo '</div></div>';
		greenlet_markup_close();
	}
}

function greenlet_do_footer() {
	greenlet_markup( 'site-footer',	greenlet_attr( 'site-footer' ) );
	printf( '<div %s>', greenlet_attr( 'container' ) );
	printf( '<div %s>', greenlet_attr( 'row' ) );
	greenlet_cover( 'footer' );
	$text = sprintf( '<div %s><p>', greenlet_attr( 'copyright' ) );
	$text .= sprintf( '&copy; %1$s &middot; <a href="%2$s">%3$s</a> &middot; <a href="#" target="_blank">Greenlet</a></p></div>', date( 'Y' ), get_home_url(), get_bloginfo( 'name' ) );
	echo apply_filters( 'greenlet_copyright', $text );
	echo '</div></div>';
	greenlet_markup_close();
}
