<?php
/**
 * Frontend Helper functions.
 *
 * @package greenlet\library\frontend
 */

if ( ! function_exists( 'greenlet_meta_description' ) ) {
	/**
	 * Get meta description.
	 *
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
