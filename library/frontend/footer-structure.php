<?php
/**
 * Footer Structure.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'greenlet_footer', 'greenlet_do_footer' );

/**
 * Display the footer text.
 *
 * @since  2.0.0
 * @return void
 */
function greenlet_footer_text() {
	$text  = sprintf( '<div %s><p>', greenlet_attr( 'copyright' ) );
	$text .= sprintf(
		'&copy; %1$s &middot; <a href="%2$s">%3$s</a> &middot; %4$s <a href="https://greenletwp.com/" target="_blank" rel="nofollow noopener">%5$s</a></p></div>',
		date_i18n( __( 'Y', 'greenlet' ) ),
		esc_url( get_home_url() ),
		get_bloginfo( 'name' ),
		__( 'Powered By', 'greenlet' ),
		__( 'Greenlet', 'greenlet' )
	);
	echo wp_kses_post( apply_filters( 'greenlet_copyright', $text ) );
}

/**
 * Display the footer.
 *
 * @since  1.0.0
 * @see    greenlet_cover() to display semifooter columns.
 * @return void
 */
function greenlet_do_footer() {
	$cover_rows  = gl_get_option( 'footer_layout', greenlet_cover_layout_defaults( 'footer' ) );
	$last_footer = count( $cover_rows );

	add_action( "greenlet_after_footer_{$last_footer}_columns", 'greenlet_footer_text' );

	greenlet_cover( 'footer' );
}
