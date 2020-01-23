<?php
/**
 * Sidebar Template.
 *
 * The primary sidebar.
 *
 * @package greenlet
 */

// Sidebar index (name or id) and width can be set using set_query_var.
// See http://codex.wordpress.org/Function_Reference/get_template_part.

$sidebar_index = isset( $sidebar_index ) ? $sidebar_index : 'sidebar-1';
$sidebar_width = isset( $sidebar_width ) ? $sidebar_width : '3';

if ( is_active_sidebar( $sidebar_index ) ) {
	$args = array(
		'primary' => 'sidebar',
		'width'   => $sidebar_width,
	);

	greenlet_markup( 'sidebar', greenlet_attr( $args ) );
	greenlet_markup( 'div', greenlet_attr( 'wrap' ) );
	dynamic_sidebar( $sidebar_index );
	greenlet_markup_close( 2 );
}
