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
	global $wp_styles, $wp_version;
	$registered = $wp_styles->registered;

	if ( ! array_key_exists( 'wp-block-library', $registered ) ) {
		return;
	}

	$block_style = $registered['wp-block-library'];
	wp_dequeue_style( 'wp-block-library' );
	wp_deregister_style( 'wp-block-library' );

	$disable = gl_get_option( 'disable_block_editor', false );
	if ( false === $disable ) {
		$defered = gl_get_option( 'defer_block_css', '1' );
		$inline  = gl_get_option( 'inline_block_css', '1' );
		greenlet_enqueue_style( 'wp-block-library', $block_style->src, array(), $wp_version, $inline, $defered );
	}
}

add_action( 'wp_enqueue_scripts', 'greenlet_remove_block_library_css', 20 );
