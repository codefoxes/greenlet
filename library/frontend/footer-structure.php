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
add_action( 'greenlet_after_footer', 'greenlet_to_top_button' );

/**
 * Display the footer.
 *
 * @since  1.0.0
 * @see    greenlet_cover() to display footer columns.
 * @return void
 */
function greenlet_do_footer() {
	greenlet_cover( 'footer' );
}

/**
 * Back to top button.
 */
function greenlet_to_top_button() {
	if ( false !== gl_get_option( 'to_top', '1' ) ) {
		echo '<button ' . wp_kses( greenlet_attr( 'to-top' ), null ) . ' type="button" onclick="window.scrollTo(0,0)" aria-label="' . esc_attr__( 'Back to top', 'greenlet' ) . '">';
		echo apply_filters( 'greenlet_to_top_content', '<div class="icon"></div>' ); // phpcs:ignore
		echo '</button>';
	}
}
