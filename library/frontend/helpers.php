<?php
/**
 * Frontend Helper functions.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'greenlet_meta_description' ) ) {
	/**
	 * Get meta description.
	 *
	 * @since  1.0.0
	 * @return string Meta description.
	 */
	function greenlet_meta_description() {
		if ( is_single() ) {
			$description = single_post_title( '', false );
		} else {
			$description = get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' );
		}

		return $description;
	}
}
