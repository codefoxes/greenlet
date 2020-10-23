<?php
/**
 * Frontend Helper functions.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'wp_body_open' ) ) {
	/**
	 * The shim for wp_body_open.
	 *
	 * @since 1.2.5
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
}

/**
 * Get page data.
 *
 * @since  2.0.0
 * @return string Page data.
 */
function greenlet_page_data() {
	if ( is_front_page() ) {
		$data = get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' );
	} else {
		$data = get_bloginfo( 'name' ) . wp_title( '&raquo;', false );
	}

	return $data;
}
