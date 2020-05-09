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
