<?php
/**
 * Footer Structure.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'greenlet_semifooter', 'greenlet_do_semifooter' );
add_action( 'greenlet_footer', 'greenlet_do_footer' );

/**
 * Display the semifooter.
 *
 * @see greenlet_cover() to display semifooter columns.
 * @return void
 */
function greenlet_do_semifooter() {

	$sfshow = gl_get_option( 'show_semifooter', false );

	if ( false !== $sfshow ) {
		greenlet_markup( 'semifooter', greenlet_attr( 'semifooter' ) );
		printf( '<div %s>', wp_kses( greenlet_attr( 'container' ), null ) );
		printf( '<div %s>', wp_kses( greenlet_attr( 'row' ), null ) );
		greenlet_cover( 'semifooter' );
		echo '</div></div>';
		greenlet_markup_close();
	}
}

/**
 * Display the footer.
 *
 * @see greenlet_cover() to display semifooter columns.
 * @return void
 */
function greenlet_do_footer() {
	greenlet_markup( 'site-footer', greenlet_attr( 'site-footer' ) );
	printf( '<div %s>', wp_kses( greenlet_attr( 'container' ), null ) );
	printf( '<div %s>', wp_kses( greenlet_attr( 'row' ), null ) );
	greenlet_cover( 'footer' );
	$text  = sprintf( '<div %s><p>', greenlet_attr( 'copyright' ) );
	$text .= sprintf( '&copy; %1$s &middot; <a href="%2$s">%3$s</a> &middot; Powered By <a href="https://greenletwp.com/" target="_blank" rel="nofollow noopener">Greenlet</a></p></div>', gmdate( 'Y' ), get_home_url(), get_bloginfo( 'name' ) );
	echo apply_filters( 'greenlet_copyright', $text ); // phpcs:ignore
	echo '</div></div>';
	greenlet_markup_close();
}
