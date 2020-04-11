<?php
/**
 * Performance.
 *
 * @package greenlet\library\frontend
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Dequeue Block Editor CSS if opted.
 *
 * @since 1.0.0
 * @return void
 */
function greenlet_remove_block_library_css() {
	$disable = gl_get_option( 'disable_block_editor', false );
	if ( false === $disable ) {
		return;
	}

	wp_dequeue_style( 'wp-block-library' );
}

add_action( 'wp_enqueue_scripts', 'greenlet_remove_block_library_css' );
